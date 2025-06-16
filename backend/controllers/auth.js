const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Users = require('../models/User'); 
const Admin = require('../models/Admin');
const Consultants = require('../models/Consultants');

const handleLogin = async(req,res)=> {
    try {
        const {email, password} = req.body;

        const emailExists = await Users.findOne({email});
        if(!emailExists) return res.status(401).json({success:false,msg:"No user exists please create an account"});

        const verify = await bcryptjs.compare(password, emailExists.password);
        if(!verify) return res.status(400).json({success:false,msg:"Incorrect password"});

        const userData = {
            id:emailExists._id,
            name:`${emailExists.first_name+" "+emailExists.last_name}`,
            email:email,
            phone:emailExists.phone
        }
        const token = jsonwebtoken.sign({userData}, process.env.JWT_SECRET, {'expiresIn':'1h'});

        res.cookie('authtoken', token, {
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge:3600000
        });

        return res.status(200).json({success:true, msg:"Login successfull", userData});
        
    }   
    catch(err) {
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
} 


const userSignUp = async(req, res) => {
    try {
        const {first_name, last_name, email, phone, password} = req.body;

        const userExists = await Users.findOne({email});

        if(userExists) return res.status(400).json({succes:false, msg:"User exists please login"});

        const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));

        await Users.create({
            first_name,
            last_name,
            email,
            phone,
            password:hashedPassword
        });

        return res.status(201).json({success:true, msg:"User account created successfully"});
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
}


const checkAuth = async(req, res) => {
    try {
        const token = req.cookies?.authtoken;
        if(!token) return res.status(401).json({success:false,msg:"Not logged in"});
        const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        console.log(verify)
        if(!verify) return res.status(400).json({success:false, msg:"Do not tamper with JWT"});

        const user = await Users.findOne({email:verify.userData.email});

        const userData = {
            id:user._id,
            name:`${user.first_name+" "+user.last_name}`,
            email:user.email,
            phone:user.phone,
        };
        return res.status(200).json({success:true, msg:"Already loggedIn", userData});
    }
    catch(err) {
        if(err instanceof jsonwebtoken.TokenExpiredError) return res.status(401).json({success:false, msg:"Your session has expired please re-login"});

        if(err instanceof jsonwebtoken.JsonWebTokenError) return res.status(401).json({success:false,msg:"Invalid authentication token"});

        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured  please try again later"});
    }
}

const adminSignUp = async(req, res)=> {
    try {
        const {email, password} = req.body;

        const user = await Admin.findOne({email});
        if(user) return res.status(400).json({success:false, msg:"Admin exists"});

        const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));
        await Admin.create({
            email,
            password:hashedPassword,
        });

        return res.status(201).json({success:true, msg:"Account created successfully"});
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
}

const consultantSignUp = async(req, res) => {
    try {
        const {name,email, password} = req.body;

        const user = await Consultants.findOne({email});
        if(user) return res.status(400).json({success:false, msg:"Consultant exists"});

        const hashedPassword = await bcryptjs.hash(password, await bcryptjs.genSalt(10));

        await Consultants.create({
            name,
            email,
            password:hashedPassword
        });
                return res.status(201).json({success:true, msg:"Account created successfully"});

    }   
    catch(err) {
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
}

const adminLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Admin.findOne({email});
        if(!user) return res.status(400).json({success:false, msg:"Invalid email id"});
        const decode = await bcryptjs.compare(password, user.password);
        if(!decode) return res.status(400).json({success:false, msg:"Invalid Password"});
        const userData = {
            email
        }
        const token = jsonwebtoken.sign({userData}, process.env.JWT_SECRET, {'expiresIn':'1h'});
        res.cookie('authtoken', token, {
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge:3600000
        });
        return res.status(200).json({success:true, msg:"Login successfull"});
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
    
}

const consultantLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await Consultants.findOne({email});
        if(!user) return res.status(400).json({success:false, msg:"Invalid email id"});
        const decode = await bcryptjs.compare(password, user.password);
        if(!decode) return res.status(400).json({success:false, msg:"Invalid Password"});
        
        const userData = {id:user._id,email}
        const token = jsonwebtoken.sign({userData}, process.env.JWT_SECRET, {'expiresIn':'1h'});
        res.cookie('authtoken', token, {
            httpOnly:true,
            secure:true,
            sameSite:'none',
            path:'/',
            maxAge:3600000
        });
        return res.status(200).json({success:true, msg:"Login successfull",id:user._id});
    }
    catch(err) {
        console.log(err.message);
        return res.status(500).json({success:false, msg:"Some error occured please try again later"});
    }
    
}


module.exports = {checkAuth, handleLogin, userSignUp, adminSignUp, adminLogin, consultantSignUp, consultantLogin}