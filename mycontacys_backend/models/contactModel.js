const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
    name: {
        type : 'string',
        required : [true, "please provide a name"]
    },
    email: {
        type : 'string',
        required : [true, "please provide a email address"]
    },
    phone: {
        type : 'string',
        required : [true, "please provide a phone number"]
    }
},{
    timestamp : true,
});

module.exports = mongoose.model("contact",contactSchema);