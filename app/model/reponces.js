const mongoose = require('mongoose');
const Joi = require('joi');


const reponcesSchema = mongoose.Schema({
    formulaireID: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'formulaire'
    },
    reponces: {
        type: Array,
    },
    mail:{
        type:String,
        required:true
    },
},
    { timestamps: true }
);




module.exports.Reponces = mongoose.model("reponces", reponcesSchema);