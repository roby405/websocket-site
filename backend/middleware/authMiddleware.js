const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers["authorization"]

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(403).json({ error: "No token provided" });
    }

    // Extract token safely
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }

    if (!token) {
        return res.status(403).json({ error: "No token provided" });
    }
    
    jwt.verify(token, "verysecretstring", (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        req.user = decoded;
        next();
    });  
}

module.exports = authMiddleware;