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
    num_tel: {
        type: Schema.Types.String,
        required: [true, "le numero de téléphone est obligatoire"],
        trim: true,
        length: 10,
    },
    email: {
            type: Schema.Types.String,
            trim: true,
            validate: {
                validator: validator.validate,
                message: "Format d'email invalide"
            },
            unique: [true, "ce email existe déjà"],
            maxlength: 255
        }
    
}, {timestamps: true})

const Client = model('Client', clientSchema)
//write actions, they gonna be used in controllers, it is a practice to keep them abstracted

export default Client