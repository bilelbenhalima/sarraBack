const mongoose = require('mongoose');
const Joi = require('joi');


const formulaireSchema = mongoose.Schema({
    title: {
        type: String,
        required:true,
    },
    description: {
        type: String,
        required:true,
    },
    fomulaire:{ 
        type: Array
    }
    ,
},
    { timestamps: true }
);




module.exports.Formulaire = mongoose.model("formulaire", formulaireSchema);

