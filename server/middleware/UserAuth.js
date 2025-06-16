import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // adjust the path as needed

const UserAuth = async (req, res, next) => {
    
    

    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    

    if (!authHeader ) {
        return res.status(401).json({ success: false, message: "JWT must be provided with Bearer" });
    }

    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;

    // console.log(token);
    

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log(decoded);
        
        

        // Check if this is the super admin
        
        if (decoded.email === process.env.ADMIN_EMAIL) {
            req.user = {
                id: null,
                email: decoded.email,
                role: "superadmin"
            };
            return next();
        }
        

        const user = await User.findById(decoded.userId);
        // console.log(user);
        
        if (!user) {

            return res.status(401).json({ success: false, message: "User not found" });
        }
        // console.log("sxss");
        

        req.user = user;
        req.user.role = "user";
        

        next();
    } catch (error) {

        return res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default UserAuth;
