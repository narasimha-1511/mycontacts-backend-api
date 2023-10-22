const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please Enter Username"],
    },
    email:{
        type:String,
        required:[true,"Please enter the email ID"],
        unique:[true,"email address already taken"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Password"],
    }
},{
    timestamps: true,
});

module.exports = mongoose.model("User",UserSchema);