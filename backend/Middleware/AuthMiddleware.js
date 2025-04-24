import jwt from 'jsonwebtoken'

export const protectedRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.status(401).json({message: "No Token Provided"})
        }

        const decoded = jwt.verify(token , process.env.JWT_KEY)

        if(!decoded){

            return res.status(401).json({message: "Invalid Token"})    
        }
        req.user=decoded
        next()
    } catch (error) {
        console.log("Error in protected middleware" , error.message)
        navigate("/login")
        res.status(500).json({message: "Server Error"})
    }
}