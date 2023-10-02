import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        res.status(401).json({ message: "Please authenticate with valid crendential" })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.id = data.id;
        next();
    } catch (error) {
        res.status(401).json({ message: "Please authenticate with valid crendential" })
    }
}

export {verifyAuth}