const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username : {
        type : 'string',
        required : [true,"please provide a username"],
    },
    email : {
        type : 'string',
        required : [true,"please provide a email address"],
        unique : [true,"email address is already exists"],
    },
    password : {
        type : 'string',
        required : [true,"please provide a Password"],
    },
},{
    timestamps : true,
});

const User = mongoose.model("user", userSchema);
module.exports = User;