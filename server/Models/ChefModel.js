const mongoose = require('mongoose');

const ChefSchema = new mongoose.Schema({
    chefname: {
        type: String,
        required: true,
    },
    chefimage: {
        type: String,
        required: false, // Optional if chef image is not mandatory
    },
    chefbio: {
        type: String,
        required: true,
    },
    chefspecialty: {
        type: String,
        required: true,
    }
}, { timestamps: true });


module.exports = mongoose.model('Chef', ChefSchema); 
