const mongoose = require('mongoose');
const Joi = require('joi');


const userSchema = mongoose.Schema({
    email: {
        type: String,
        required:true,
    },
    password: {
        type: String,
        required:true,
    },
    full_name:{
        type: String,
        required:true,
    }
},
    { timestamps: true }
);

function validateUser(user) {
    const schema = {
        email: Joi.string().min(5).max(255),
        password: Joi.string().min(8).max(255).required(),
        full_name: Joi.string().min(5).max(255),
    };
    return Joi.validate(user, schema, { abortEarly: false });
}
function validatePassword(user) {
    const password = Joi.string()
        .min(8)
        .max(255)
        .required();

    return Joi.validate(user, password, { abortEarly: false });
}


module.exports.User = mongoose.model("user", userSchema);
module.exports.validate = validateUser;
module.exports.validatePassword = validatePassword;
