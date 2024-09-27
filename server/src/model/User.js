const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    name: {
        type:String,
        require: [true, "Please add the name"]
    },
    email: {
        type:String,
        require: [true, "Please add the email address"],
        unique: true
    },
    password: {
        type:String,
        require: [true, "Please add the Password"]
    },
},
{
    timestamps:true,
});

module.exports = mongoose.model("User", UserSchema);