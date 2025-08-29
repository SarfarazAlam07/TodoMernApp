const JWT = require('jsonwebtoken');

module.exports = async (req,res,next)=>{
    try {
        // ✅ FIXED: safe check add kiya
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
            return res.status(400).send({
                success:false,
                message:"Authorization header missing"
            });
        }

        const token = authHeader.split(" ")[1]; // Bearer <token>
        if (!token) {
            return res.status(400).send({
                success:false,
                message:"Token missing"
            });
        }

        JWT.verify(token, process.env.JWT_SECRET, (err, decoded)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:"Unauthorized user",
                    error:err
                });
            }else{
                req.id = decoded.id;
                next();
            }
        });

    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Please provide Auth token",
            error,
        })
    }
}
