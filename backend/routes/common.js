const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function verifyToken(req, res, next) {
    let authHeader = req.headers["authorization"];
    // AuthHeader Format: Bearer <TOKEN>
    let token = authHeader && authHeader.split(" ")[1];
    if(token) {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, data) => {
            if(err) {
                res.status(401).json({ message: "Forbidden access to delete user" });
                return;
            }

            try {
                let users = await User.find({ _id: data.id });
                if(users.length > 0) {
                    req.user = users[0];
                    next()
                } else {
                    res.status(400).json({ message: "Fake user" });
                }
            } catch(err) {
                if(err) {
                    res.status(500).json({ message: "Internal server error" });
                    return;
                }
            }
        });
    } else {
        res.status(401).json({ message: "Invalid token" });
    }
}

module.exports = {
    verifyToken
};