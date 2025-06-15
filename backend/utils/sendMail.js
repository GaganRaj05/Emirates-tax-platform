const {Resend} = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);


const sendMailToAdmin = async() => {
    try {
        const data = await resend.emails.send({
            from:``,
            to:'',
            subject:'A new user has uploaded tax document',
            html:`<h1>Please check your dashboard, A new user has uploaded his tax document </h1>`
        });
        console.log('Email sent to admin successfully');
    }
    catch(err) {
        console.log(err.message);
        throw new Error("Failed to send email to admin"); 
    } 
}

const sendMailToUser = async(userEmail) => {
    try {   

        const data = await resend.emails.send({
            from:'',
            to:[userEmail],
            subject:'Your tax report has been generated succesfully',
            html:`<h1>Your tax report has been generated successfully please login to your dashboard to access your tax report</h1>`
        });

        console.log("Email sent successfully to user")
    }
    catch(err) {
        console.log(err.message);
        throw new Error("Failed to send email to user");
    }
}

const sendMailToConsultants = async(consultantEmail) => {
    try {
        const data = await resend.emails.send({
            from:``,
            to:[consultantEmail],
            subject:'Admin has assigned you a tax document for review',
            html:`<h1>Please check your dashboard, A new user has uploaded his tax document review it and send it as soon as possible </h1>`
        });
        console.log('Email sent to admin successfully');
    }
    catch(err) {
        console.log(err.message);
        throw new Error("Failed to send email to admin"); 
    } 
}


module.exports = {sendMailToAdmin, sendMailToUser, sendMailToConsultants};