let express = require('express');
let router = express.Router();

const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/user");
const Post = require("../models/post");

const { verifyToken } = require("./common");

router.get("/", async (req, res) => {
    try {
        let users = await User.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.params.id });
        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", async (req, res) => {
    if (!req.body.password) {
        res.status(400).json({ message: "Password required"});
        return;
    }
    if (!req.body.username) {
        res.status(400).json({ message: "Username required"});
        return;
    }

    let username = req.body.username;
    let password = req.body.password;

    let salt = crypto.randomBytes(16).toString("hex");
    let hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex");

    const user = new User({
        username,
        hash,
        salt,
    });

    try {
        let name = await User.findOne({username: req.body.username})
        if (!name) {
            const newUser = await user.save();
            res.status(201).json(newUser);
        }else {
            res.status(403).json({ message: "Username already taken" });
        }
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});

router.post("/login", async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username});
        if(user) {
            let password = req.body.password;
            let salt = user.salt;
            let hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex");
    
            if(user.hash === hashPassword) {
                let userData = {
                    id: user._id,
                };
    
                let token = jwt.sign(userData, process.env.ACCESS_TOKEN_SECRET);
    
                res.status(200).json({ token });
            } else {
                res.status(403).json({ message: "Username or Password incorrect" });
            }
        } else {
            res.status(403).json({ message: "Username or Password incorrect" });
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.delete("/", verifyToken, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user.id });

        if(user) {
            await Post.deleteMany({ user: req.user.id });
            await User.deleteMany({ _id: req.user.id });
            res.sendStatus(200);
        } else {
            res.status(400).json({ message: "Cannot delete user" });
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/", verifyToken, async (req, res) => {
    // TODO: Change username?

    try {
        if(req.body.oldPassword && req.body.newPassword) {
            let password = req.body.oldPassword;
            let salt = req.user.salt;
            let hashPassword = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString("hex");

            if(req.user.hash === hashPassword) {
                let newSalt = crypto.randomBytes(16).toString("hex");
                let newHashPassword = crypto.pbkdf2Sync(req.body.newPassword, newSalt, 1000, 64, 'sha512').toString("hex");

                await User.updateOne({ _id: req.user.id }, {$set: { hash: newHashPassword, salt: newSalt }});
                res.sendStatus(200);
            } else {
                res.sendStatus(401);
            }
        }
    } catch(err) {
        res.status(500).json({ message: err.message });   
    }
});

module.exports = router;