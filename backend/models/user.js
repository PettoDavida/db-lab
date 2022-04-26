const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },

    hash: {
        type: String,
        required: true,
    },

    salt: {
        type: String,
        required: true,
    }
});

userSchema.set("toJSON", {
    transform: (doc, ret, opt) => {
        delete ret["salt"];
        delete ret["hash"];
        return ret;
    }
})

module.exports = mongoose.model('User', userSchema);
