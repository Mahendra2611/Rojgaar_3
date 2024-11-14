import { Company } from "../models/company.model.js";
export const registerCompany = async(req,res)=>{
    //console.log("register company ")
    const { name, description, website, location } = req.body;
    if (!name || !description || !website ||!location ) {
        return res.status(Number(process.env.INPUT_FIELD_HTTPS_CODE)||400).json({
            message: "Input fiels are not correct"
        })
    }
    const file = req.file;
    //console.log(file)
    const userId = req.userId
    try {
        // const company = await Company.findOne({userId:userId});
        // console.log(company)
        // if (company) {
        //     return res.status(400).json({
        //         message: "You can create only 1 company",
        //         success: false
        //     })
        // }
       
        const companyData = await Company.create({
           name,
           description,
           website,
           logo:file?.path,
           location,
           userId:userId
        })
       

        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            message: "company registered  successfully",
            success: true,
            company: companyData
        })
    } catch (error) {
        if (error.name === 'MongooseError' && error.message.includes('buffering timed out')) {
            return res.status(503).json({
              success: false,
              message: "Database connection timeout. Please check your internet connection or try again later.",
            });
          } else {
            return res.status(500).json({
              success: false,
              message: "An error occurred while processing your request.",
            });
    }
}
}
export const getCompany = async(req,res)=>{
try {
    const userId = req.userId;
    const company = await Company.find({userId:userId},{userId:0});
   // console.log(company)
    return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        companies:company
    })
} catch (error) {
    //console.log(error);
    return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
        message: "Server Error"
    })
}
}
export const getCompanyById = async(req,res)=>{
    try {
        const id = req.params.id;
       
        const company = await Company.findOne({_id:id},{userId:0});
        if(!company){
            return res.status(404).json({
                message:"Companies not found"
            })
        }
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            company:company
        })
    } catch (error) {
        //console.log(error);
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message: "company searching failed"
        })
    }
}
export const updateCompany = async(req,res)=>{
    try {
        const { name, description, website, location } = req.body;

        //console.log(req.body)
        const file = req.file;
        //console.log(file)
        if (!name || !description||!website ||!location ) {
            return res.status(400).json({
                message: "Input fiels are not correct"
            })
        }
       // console.log(req.params.id)
        if(!req.params.id){
            return res.status(400).json({
                message: "Some thing went wrong"
            })
        }
        const updateData = {};
        if(name){
            updateData['name'] = name;
        }
        if(description){
            updateData['description'] = description;
        }
        if(name){
            updateData['website'] = website;
        }
        if(name){
            updateData['location'] = location;
        }
        if(file){
            updateData['logo'] = file.path;
        }
       // console.log(updateData)
       
        const company = await Company.findByIdAndUpdate(req.params.id, {$set:updateData}, { new: true});
        //console.log(company)
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
            message:"Company information updated.",
            success:true,
            company:company
        })

    } catch (error) {
        //console.log(error);
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message:"Something went wrong"
        })
    }
}
export const deleteCompany = async(req,res)=>{
    try {
        //console.log("deleet job called")
    const Companyid = req.params.id;
    //console.log(Companyid)
   const companyDeleted =  await Company.findByIdAndDelete(Companyid);
   //console.log(companyDeleted)
   if(!companyDeleted){
    return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
        message:"Company deletion failed"
       })
   }
  else{
    return res.status(Number(process.env.SUCCESS_STATUS_CODE)||200).json({
        message:"Compnay deleted successfully"
       })
  }
    } catch (error) {
        //console.log(error)
        return res.status(Number(process.env.SERVER_ERROR_STATUS_CODE)||500).json({
            message:"something went wrong"
        })
    }
}
