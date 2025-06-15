const Document = require("../models/Document");
const { minioClient, bucketName } = require("../config/minioConfig");
const Consultant = require("../models/Consultants");
const crypto = require("crypto");
const TaxReports = require("../models/TaxReports");
const User = require("../models/User");
const mongoose = require('mongoose')
const {
  sendMailToUser,
  sendMailToAdmin,
  sendMailToConsultants,
} = require("../utils/sendMail");
const Consultants = require("../models/Consultants");
const uploadDocument = async (req, res) => {
  try {
    const { userId, company_name, designation } = req.body;
    const file = req.files.file[0];
    const fileBuffer = file.buffer;
    const originalName = file.originalname;
    const extension = originalName.split(".").pop();
    const uniqueName = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}.${extension}`;
    const fileKey = uniqueName;

    await minioClient.putObject(bucketName, fileKey, fileBuffer, {
      "Content-Type": file.mimetype,
    });

    const signedUrl = await minioClient.presignedGetObject(
      bucketName,
      fileKey,
      10000
    );
    const newDoc = await Document.create({
      userId,
      company_name,
      designation,
      originalName,
      fileKey,
      fileUrl: signedUrl,
    });

    return res
      .status(201)
      .json({ success: true, msg: "Document uploaded successfully" });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const processDocument = async (req, res) => {
  try {
    const { fileUrl } = req.body;
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const fetchDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ reviewed: false, assigned: false });
    const consultants = await Consultant.find();
    return res
      .status(200)
      .json({
        success: false,
        msg: "Documents found successfully",
        documents,
        consultants,
      });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const assignDocument = async (req, res) => {
  try {
    const { consultant_id, document_id } = req.body;
    const document = await Document.findOne({ _id: document_id });
    document.assigned = true;
    document.save();
    const consultant = await Consultant.findOne({ _id: consultant_id });

    await consultant.assigned_document.push(document);

    await consultant.save();

    return res
      .status(201)
      .json({
        success: true,
        msg: "Document assigned to consultant successfully",
      });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const fetchConsultantDocs = async (req, res) => {
  try {
    const consultant_id = req.query.consultant_id;
    const documents = await Consultant.findOne({ _id: consultant_id }).select(
      "assigned_document"
    );

    return res
      .status(200)
      .json({
        success: true,
        msg: "Documents retrieved successfully",
        documents,
      });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const uploadTaxReport = async (req, res) => {
  try {
    const { consultant_id, document_id, user_id } = req.body;
    const tax_report = req.files.file[0];
    const file_buffer = tax_report.buffer;
    const filename = tax_report.originalname;
    const extension = filename.split(".").pop();
    const uniqueName = `${Date.now()}-${crypto
      .randomBytes(6)
      .toString("hex")}.${extension}`;
    const fileKey = uniqueName;
    await minioClient.putObject(bucketName, fileKey, file_buffer, {
      "Content-Type": tax_report.mimetype,
    });
    const signedUrl = await minioClient.presignedGetObject(
      bucketName,
      fileKey,
      2400
    );

    await TaxReports.create({
      filename,
      fileUrl: signedUrl,
      user_id,
      consultant_id,
    });
    const user = await User.findOne({ _id: user_id });

    const consultant = await Consultant.findOneAndUpdate(
      { _id: new mongoose.Types.ObjectId(consultant_id) },
      {
        $pull: {
          assigned_document: { _id: new mongoose.Types.ObjectId(document_id) },
        },
      }
    );
    await Document.deleteOne({ _id: document_id });

    return res
      .status(201)
      .json({ success: true, msg: "Tax report generated succesfully" });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

const fetchUserDocs = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const tax_docs = await TaxReports.find({ user_id });

    return res
      .status(200)
      .json({
        success: true,
        msg: "Successfully fetched user tax reports",
        tax_docs,
      });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({
        success: false,
        msg: "Some error occured please try again later",
      });
  }
};

module.exports = {
  uploadDocument,
  uploadTaxReport,
  fetchDocuments,
  fetchConsultantDocs,
  assignDocument,
  fetchUserDocs,
};
