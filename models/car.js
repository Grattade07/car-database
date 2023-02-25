/* The Schema for the cars database */

/* imports mongoose */
const mongoose  = require("mongoose")

/* creates a schema that describes what data is stored and how it is structured */
let CarSchema = mongoose.Schema({
    model:{
        type: Number,
        required: true
    },
    make:{
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    registration: {
        type: String,
        required: true
    }
})

/* exports the schema. Each document shall be named "Car" and created using the CarSchema */
module.exports = mongoose.model("Car", CarSchema)