const mongoose = require('mongoose');

//creating the format object for each user
const addSchema = new mongoose.Schema(
    {
        partnerNo: {
            type: Number,
            unique: true,
            required: true
        },

        Name: {
            type: String,
            unique: true,
            required: true
        },

        About:{
            type: String,
            unique: false,
            required: false
        },
        Followers:{
            type: String,
            unique: false,
            required: false
        }
        
    }
)

const Add = mongoose.model('Add', addSchema);

//export to controller and build
module.exports = Add;