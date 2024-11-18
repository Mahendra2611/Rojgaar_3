// import nodemailer from "nodemailer";
// import bcrypt from "bcrypt"
// import { OTP } from "../models/OPTverification.model";
// export const verificationEmail = async ({_id,email}) => {
//   console.log("verification called");
//   const randomOTP = Math.floor(1000+Math.random()*9000)
//   const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'web91920@gmail.com', 
//         pass: 'bska rmyr lhnh ovch', 
//     },
//   });
//   const mailOptions = {
//     from: 'web91920@gmail.com',
//     to: email,
//     subject: "Verify Email",
//     text: `Your verification code is ${randomOTP} 
//     It is valid for 1 hour`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     const hashOTP = await bcrypt.hash(randomOTP,10);
//     await OTP.create({
//         otp:hashOTP,
//         userId:_id,
//         createdAt:Date.now(),
//         expiresAt:Date.now()*3600000
//     })
//     res.status(200).json({
//         status:"pending",
//         message:"verification otp sent",
//         data:randomOTP,
//     });
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Error sending email');
//   }
// }


