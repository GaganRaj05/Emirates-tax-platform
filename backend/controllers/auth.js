const jsonwebtoken = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const Users = require("../models/User");
const Admin = require("../models/Admin");
const Consultants = require("../models/Consultants");

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const emailExists = await Users.findOne({ email });
    if (!emailExists)
      return res.status(401).json({
        success: false,
        msg: "No user exists please create an account",
      });

    const verify = await bcryptjs.compare(password, emailExists.password);
    if (!verify)
      return res
        .status(400)
        .json({ success: false, msg: "Incorrect password" });

    const userData = {
      id: emailExists._id,
      name: `${emailExists.first_name + " " + emailExists.last_name}`,
      email: email,
      role: "user",
    };
    const token = jsonwebtoken.sign({ userData }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("authtoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 3600000,
    });

    return res
      .status(200)
      .json({ success: true, msg: "Login successfull", userData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const userSignUp = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, password } = req.body;

    const userExists = await Users.findOne({ email });

    if (userExists)
      return res
        .status(400)
        .json({ succes: false, msg: "User exists please login" });

    const phoneExists = await Users.findOne({ phone });
    if (phoneExists)
      return res.status(400).json({
        success: false,
        msg: "An account exists with that phone number, Please Login",
      });
    const hashedPassword = await bcryptjs.hash(
      password,
      await bcryptjs.genSalt(10)
    );

    await Users.create({
      first_name,
      last_name,
      email,
      phone,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, msg: "User account created successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const checkAuth = async (req, res) => {
  try {
    const token = req.cookies?.authtoken;
    const role = req.query.role;
    if (!token)
      return res.status(401).json({ success: false, msg: "Not logged in" });
    const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    if (!verify)
      return res
        .status(400)
        .json({ success: false, msg: "Do not tamper with JWT" });
    let userData = "";
    if (role === "admin") {
      console.log(verify);
      const admin = await Admin.findOne({ _id: verify.userData.id });
      userData = {
        id: admin._id,
        name: "admin",
        email: admin.email,
        role: "admin",
      };
    } else if (role === "user") {
      const user = await Users.findOne({ email: verify.userData.email });

      userData = {
        id: user._id,
        name: `${user.first_name + " " + user.last_name}`,
        email: user.email,
        role: "user",
      };
    } else {
      const consultant = await Consultants.findOne({ _id: verify.userData.id });
      userData = {
        id: consultant._id,
        name: consultant.name,
        email: consultant.email,
        role: "consultant",
      };
    }
    return res
      .status(200)
      .json({ success: true, msg: "Already loggedIn", userData });
  } catch (err) {
    console.log(err.message);
    if (err instanceof jsonwebtoken.TokenExpiredError)
      return res.status(401).json({
        success: false,
        msg: "Your session has expired please re-login",
      });

    if (err instanceof jsonwebtoken.JsonWebTokenError)
      return res
        .status(401)
        .json({ success: false, msg: "Invalid authentication token" });

    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured  please try again later",
    });
  }
};

const adminSignUp = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (user)
      return res.status(400).json({ success: false, msg: "Admin exists" });

    const hashedPassword = await bcryptjs.hash(
      password,
      await bcryptjs.genSalt(10)
    );
    await Admin.create({
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ success: true, msg: "Account created successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const consultantSignUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await Consultants.findOne({ email });
    if (user)
      return res.status(400).json({ success: false, msg: "Consultant exists" });

    const hashedPassword = await bcryptjs.hash(
      password,
      await bcryptjs.genSalt(10)
    );

    await Consultants.create({
      name,
      email,
      password: hashedPassword,
    });
    return res
      .status(201)
      .json({ success: true, msg: "Account created successfully" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Admin.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "Invalid email id" });
    const decode = await bcryptjs.compare(password, user.password);
    if (!decode)
      return res.status(400).json({ success: false, msg: "Invalid Password" });
    const userData = {
      name: "admin",
      id: user._id,
      email,
      role: "admin",
    };
    const token = jsonwebtoken.sign({ userData }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("authtoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 3600000,
    });
    return res
      .status(200)
      .json({ success: true, msg: "Login successfull", userData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const consultantLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Consultants.findOne({ email });
    if (!user)
      return res.status(400).json({ success: false, msg: "Invalid email id" });
    const decode = await bcryptjs.compare(password, user.password);
    if (!decode)
      return res.status(400).json({ success: false, msg: "Invalid Password" });

    const userData = {
      id: user._id,
      email,
      name: "consultant",
      role: "consultant",
    };
    const token = jsonwebtoken.sign({ userData }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.cookie("authtoken", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 3600000,
    });
    console.log(userData);
    return res
      .status(200)
      .json({ success: true, msg: "Login successfull", userData });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const getAccountInfo = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    console.log(user_id);
    const user = await Users.findOne({ _id: user_id }).select("-password");
    if (user)
      return res.status(200).json({
        success: true,
        msg: "User details fetched successfully",
        user: user,
      });

    const consultant = await Consultants.findOne({ _id: user_id }).select(
      "-password"
    );
    console.log(JSON.stringify(consultant, null, 2));
    if (consultant)
      return res.status(200).json({
        success: true,
        msg: "User details fetched successfully",
        user: consultant,
      });

    return res.status(401).json({
      success: false,
      msg: "No users found please try again in some time",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(501).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const updateUserInfo = async (req, res) => {
  try {
    const { first_name, last_name, phone, email, id } = req.body;
    const anotherUserExists = await Users.find({
      $or: [{ email: email }, { phone: phone }],
    });
    if (anotherUserExists) {
      return res
        .status(401)
        .json({
          success: false,
          msg: "An user with the email id exists or phone exists",
        });
    }
    const user = await Users.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          first_name: first_name,
          last_name: last_name,
          email: email,
          phone: phone,
        },
      }
    );
    if (user)
      return res
        .status(200)
        .json({ success: true, msg: "User info updated successfully" });

    const anotherConsultantExists = await Consultants.find({
      $or: [email, phone],
    });
    if (anotherConsultantExists) {
      return res
        .status(401)
        .json({
          success: false,
          msg: "An user with the email id exists or phone exists",
        });
    }

    const consultant = await Consultants.findOneAndUpdate(
      { _id: id },
      { $set: { name: first_name, phone: phone, email: email } }
    );

    if (consultant)
      return res
        .status(200)
        .json({ success: true, msg: "User info updated successfully" });

    return res
      .status(400)
      .json({ success: false, msg: "No users found, Please try again later" });
  } catch (err) {
    console.log(err.message);
    return res.status(501).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

const handlePassowordUpdate = async (req, res) => {
  try {
    const { id, current_password, password } = req.body;
    console.log(req.body);
    const user = await Users.findOne({ _id: id });
    if (user) {
      const verify = await bcryptjs.compare(current_password, user.password);
      if (!verify)
        return res
          .status(401)
          .json({ success: false, msg: "Incorrect passowrd entered" });

      user.password = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
      user.save();
      return res
        .status(201)
        .json({ success: true, msg: "Password updated successfully" });
    }
    const consultant = await Consultants.findOne({ _id: id });
    if (consultant) {
      const verify = await bcryptjs.compare(
        current_password,
        consultant.password
      );
      if (!verify)
        return res
          .status(401)
          .json({ success: false, msg: "Incorrect password entered" });
      consultant.password = await bcryptjs.hash(
        password,
        await bcryptjs.genSalt(10)
      );
      consultant.save();
      return res
        .status(201)
        .json({ success: true, msg: "Password updated successfully" });
    }
    return res.status(400).json({
      success: false,
      msg: "No user account exists please try again later",
    });
  } catch (err) {
    console.log(err.message);
    return res.status(501).json({
      success: false,
      msg: "Some error occured please try again later",
    });
  }
};

module.exports = {
  checkAuth,
  handleLogin,
  userSignUp,
  adminSignUp,
  adminLogin,
  consultantSignUp,
  consultantLogin,
  getAccountInfo,
  updateUserInfo,
  handlePassowordUpdate,
};
