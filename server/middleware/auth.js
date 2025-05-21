    const jwt = require("jsonwebtoken");

    const auth = (req, res, next) => {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "No token , authorization failed" });
        }
        const token = authHeader.split(" ")[1];
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decode.user;
            next();
        } catch (err) {
            res.status(401).json({ message: "Token is not valid" });
        }
    };

    module.exports = auth;
