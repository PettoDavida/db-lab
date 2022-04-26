let express = require('express');
let router = express.Router();

const mongoose = require("mongoose");

const Post = require("../models/post");
const { verifyToken } = require("./common");

router.get("/", async (req, res) => {
    try {
        let users = await Post.find();
        res.json(users);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.get("/:id", async (req, res) => {
    try {
        let user = await Post.findOne({ _id: req.params.id });
        res.json(user);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", verifyToken, async (req, res) => {
    let post = new Post({
        title: req.body.title,
        content: req.body.content,
        user: req.user.id,
    });

    try {
        await post.save();
        res.sendStatus(200);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.put("/:id", verifyToken, async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id, user: req.user._id });
        if(post) {
            if(req.body.newTitle) {
                await Post.updateOne({ _id: post._id }, {$set: { title: req.body.newTitle }});
            }

            if(req.body.newContent) {
                await Post.updateOne({ _id: post._id }, {$set: { content: req.body.newContent }});
            }

            res.sendStatus(200);
        } else {
            res.status(401).json({ message: "Unauthorized to edit page"});
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

router.delete("/:id", verifyToken, async (req, res) => {
    try {
        let post = await Post.findOne({ _id: req.params.id, user: req.user._id });
        if(post) {
            await Post.deleteOne({ _id: post._id });
            res.sendStatus(200);
        } else {
            res.status(401).json({ message: "Unauthorized to delete page"});
        }
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;