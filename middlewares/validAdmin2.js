const validAdmin2 = (req,res,next)=>{
    //console.log(req.userRole)
    if(req.userRole !== 'admin'){
        return res.status(400).json({
            message:"admin validation failed",
            success:false
        })
    }
    else{
        next();
    }
}
export default validAdmin2