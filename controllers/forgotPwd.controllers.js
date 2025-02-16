import { User } from "../models/user.model.js"
import { OTP } from "../models/OPTverification.model.js"
import nodemailer from 'nodemailer';
import bcrypt from "bcrypt"
import crypto from 'crypto';
export const checkEmail = async(req,res)=>{
try {
    const {email,resend} = req.body
    //console.log(email)
    //console.log(resend)
    if(resend){
        const {success,otp} =  await sendOTP(email);
    const id = req.cookies['uid']
 // console.log(result._id)
  if(success){
  const isCreated =  await OTP.create({otp:otp,userId:id})
  //console.log(isCreated)
   if(!isCreated){
    return res.json({
        message:"OTP could not been sent, Try again !!!",
        success:false,
    })
  }
  else{
    return res
    .json({
        message:"OTP has been sent",
        success:true,
    })
   }
  }
  else{
    return res.json({
        message:"OTP couldn't be resent",
        success:false,
    })
  }
    }
    const result = await User.findOne({email:email})
    if(!result){
        return res.json({
            message:"user with this email doesn't exist",
            success:false,
        })
    }
    //console.log(result)
    //console.log("send otp called")
  const {success,otp} =  await sendOTP(email);
 // console.log("after otp called")
 //console.log(success)
 //console.log(otp)
  if(success){
  const isCreated =  await OTP.create({otp:otp,userId:result._id})
  //console.log(isCreated)
   if(!isCreated){
    return res.json({
        message:"OTP could not been sent, Try again !!!",
        success:false,
    })
  }
  else{
    return res
    .cookie('uid', result._id, {
        sameSite: 'None',
        secure: true,
        httpOnly: true, // <--- Added for security
      })
    .json({
        message:"OTP has been sent",
        success:true,
    })
   }
  }
  else{
    return res.json({
        message:"OTP could not been send  successfully",
        success:false,
    })
  }
   
} catch (error) {
    //console.log(error)
    return res.status(500).json({
        message:"server error occured",
        success:false,
    })
}
}
const sendOTP = async(email)=>{
    //console.log("generate otp")
const otp = generateOtp();
try {
   // console.log("transporter")
    //console.log(process.env.EMAIL_USER)
    //console.log(process.env.EMAIL_PASSWORD )
    //console.log(email)
    const transporter =  nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: process.env.EMAIL_USER, 
          pass: process.env.EMAIL_PASSWORD  
        }
      });
     
      const mailOptions = {
        from:process.env.EMAIL_USER,
        to: `${email}`,
        subject: 'Your OTP Code',
        text: `Your OTP code is ${otp}. It is valid for 15 minutes.`
      };
     
      const result = await transporter.sendMail(mailOptions);
    //   console.log(result)
    //   console.log(`OTP sent to ${email}: ${otp}`);
      return {
        success:true,
        otp:otp,
    }
     
} catch (error) {
    //console.error('Error sending OTP:', error);
    return {success:false}
}
}


function generateOtp() {
    return crypto.randomInt(1000, 9999).toString(); 
  }
  


export const verifyOTP = async(req,res)=>{
    const {otp} = req.body;
    const userId = req.cookies['uid'];
   // console.log(otp)
    //console.log(userId)
    try {
        if(!otp){
            return res.json({
                message:"OTP is incorrect",
                success:false,
            })
        }
        if(!userId){
            return res.status(404).json({
                message:"something wrong occured , try again",
                success:false,
            })
        }
        const result = await OTP.findOne({otp:otp,userId:userId})
       // console.log(result)
        if(!result){
            return res.json({
                message:"OTP is incorrect",
                success:false,
            })
        }
        else{
            return res
            .cookie("isOTPVerified",true,{
                sameSite:'None',
                httpOnly:true,
                secure:true,
            })
            .json({
                message:"OTP is correct",
                success:true,
            })
        }
    } catch (error) {
        console.log(error)
    return res.status(500).json({
        message:"server error occured",
        success:false,
    })
    }
}


export const updatePwd = async(req,res)=>{
    const {pwd} = req.body;
    const userId = req.cookies['uid'];
    const isOTPVerified = req.cookies['isOTPVerified']
    if(!isOTPVerified){
        return res.json({
            message:"OTP is not verified",
            success:false,
        })
    }
    if(!pwd ){
        return res.json({
            message:"enter the correct password",
            success:false,
        })
    }
    if(!userId){
        return res.json({
            message:"something wrong occured , try again",
            success:false,
        })
    }
try {
    console.log(pwd)
    const hashPassword = await bcrypt.hash(pwd, 10);
   const result =  await User.findByIdAndUpdate(userId,{password: hashPassword},{ new: true })
   if(!result){
    return res.status(502).json({
        message:"password can't be update , try again !!",
        success:false,
    })
   }
   else{
    return res.json({
        message:"password  update successfully",
        success:true,
    })
   }
} catch (error) {
    console.log(error)
    return res.status(500).json({
        message:"server error occured",
        success:false,
    })
}
}
