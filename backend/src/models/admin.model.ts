import {Schema, model} from 'mongoose'
// import validator from "email-validator"

const adminSchema = new Schema({
    username: {
        type: Schema.Types.String,
        minlength: 3,
        required: true,
        unique: true,
        maxlength: 100
    },
    // email: {
    //     type: Schema.Types.String,
    //     required: true,
    //     // validate: {
    //     //     validator: validator.validate,
    //         message: "Format d'email invalide"
    //     },
    //     unique: true,
    //     maxlength: 255
    //},
    password: {
        type: Schema.Types.String,
        minlength: 8,
        required: true,
    }
    
}, {
    timestamps: true
})

const adminModel = model('Admin', adminSchema)
//write actions, they gonna be used in controllers, it is a practice to keep them abstracted

export default adminModel