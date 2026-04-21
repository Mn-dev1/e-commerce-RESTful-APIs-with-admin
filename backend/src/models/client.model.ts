import { Schema, model } from 'mongoose'
import { Wilaya } from '../utils/enums.js'

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
    adresse: {
        type: Schema.Types.String,
        required: [true, "l'adresse est obligatoire"],
        trim: true,
        maxlength: 40,
        minlength: 2,
    },
    commune: {
        type: Schema.Types.String,
        trim: true,
        required: [true, "la commune est obligatoire"]
    },
    wilaya: {
        type: Schema.Types.String,
        enum: Wilaya,
        required: [true, "la wilaya est obligatoire"]
    },
    notes: {
        type: Schema.Types.String,
        maxlength: 100,
    }
    
}, {timestamps: true})

const Client = model('Client', clientSchema)
//write actions, they gonna be used in controllers, it is a practice to keep them abstracted

export default Client