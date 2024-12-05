import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = req.cookies.accessToken || (authHeader && authHeader.split(' ')[1])
    // const token = localStorage.getItem('token');
    if (!token) {
        return res.status(401).json({ success: false, message: 'You are not authorized' })
    }

    //if token exists then verify the token
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, message: 'Token is invalid' })
        }

        req.user = decoded
        next()
    })
}

export const verifyUser = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.id === req.params.id || req.user.role === 'admin') {
            next()
        }
        else {
            return res.status(401).json({ success: false, message: '[User] You are not authenticated' })
        }
    })
}

export const verifyAdmin = (req, res, next) => {
    verifyToken(req, res, next, () => {
        if (req.user.role === 'admin') {
            next();
        } else {
            return res.status(403).json({ success: false, message: '[Admin] You are not authorized' });
        }
    });
};