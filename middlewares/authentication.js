import jwt from 'jsonwebtoken'
const authentication = (req,res,next)=>{
    try {
        //const authHeaders = req.headers.authorization || req.headers.Authorization
        //console.log("authentication called")
       // console.log(req.headers)
        const authHeaders = req.cookies['access-key']
        //console.log(authHeaders)
        //console.log( typeof authHeaders)
        if(!authHeaders){
            return res.status(400).json({
                message:"authentication failed",
                success:false,
            })
        }
        const jwtToken = authHeaders;
        jwt.verify(jwtToken,process.env.JWT_SECRET_KEY,(err,decoded)=>{
            if(err){
               // console.log(err);
                return res.status(400).json({
                    message:"JWT Token Verification failed"
                })
            }
            //console.log(decoded);
            req.userId = decoded.user.userId;
            req.userRole = decoded.user.userRole
            
        })
        next();
    } catch (error) {
        //console.log(error);
        return res.status(400).json({
            message:"authentication failed"
        })
    }

}
export default authentication;