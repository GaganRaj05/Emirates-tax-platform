const jsonwebtoken = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const Users = require('../models/User'); 
const User = require('../../../../LegalEasier/backend/models/User');

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
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
} 


const userSignUp = async(req, res) => {
    try {
        const {first_name, last_name, email, phone, password} = req.body;

        const userExists = await Users.findOne({email, phone});

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
        return res.status(501).json({success:false, msg:"Some error occured please try again later"});
    }
}


const checkAuth = async(req, res) => {
    try {
        const token = req.cookies?.authtoken;
        if(!token) return res.status(401).json({success:false,msg:"Not logged in"});

        const verify = jsonwebtoken.verify(token, process.env.JWT_SECRET);
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
        return res.status(501).json({success:false, msg:"Some error occured  please try again later"});
    }
}

module.exports = {checkAuth, handleLogin, userSignUp}