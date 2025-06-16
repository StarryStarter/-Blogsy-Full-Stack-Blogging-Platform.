import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    let token = req.headers.authorization;

    // If token is missing
    if (!token) {
        return res.status(401).json({ success: false, message: "Authorization token missing" });
    }

    // If token has "Bearer " prefix, extract the actual token
    if (token.startsWith("Bearer ")) {
        token = token.split(" ")[1];
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check if it's the super admin
        if (decoded.email === process.env.ADMIN_EMAIL) {
            req.user = { userId: 'admin' };
        }

        next();
    } catch (error) {
        console.log("JWT verification failed:", error.message);
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

export default auth;
