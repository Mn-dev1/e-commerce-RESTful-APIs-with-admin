import { Schema, model } from 'mongoose'
import validator from "email-validator"

const clientSchema = new Schema({
    nom: {
        type: Schema.Types.String,
        trim: true,
        minlength: 3,
        required: [true, "le nom et prénom sont obligatoires"],
        maxlength: 100
    },
    email: {
        type: Schema.Types.String,
        validate: {
            validator: validator.validate,
            message: "Format d'émail invalide"
        },
        maxlength: 255
    },
    num_tel: {
        type: Schema.Types.Number,


    }
    
}, {
    timestamps: true
})

const Client = model('Client', clientSchema)
//write actions, they gonna be used in controllers, it is a practice to keep them abstracted

export default Client