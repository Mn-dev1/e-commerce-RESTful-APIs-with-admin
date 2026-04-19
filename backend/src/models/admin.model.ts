import { Schema, model, Document } from 'mongoose'
import validator from "email-validator"
import { Role } from "../utils/roles.js"
import bcrypt from "bcrypt"

const adminSchema = new Schema({
    username: {
        type: Schema.Types.String,
        minlength: 3,
        required: [true, "le nom de l'admin est obligatoire"],
        unique: [true, "ce nom existe déjà"],
        maxlength: 100
    },
    email: {
        type: Schema.Types.String,
        required: [true, "l'email est obligatoire"],
        validate: {
            validator: validator.validate,
            message: "Format d'email invalide"
        },
        unique: [true, "ce email existe déjà"],
        maxlength: 255
    },
    password: {
        type: Schema.Types.String,
        minlength: 8,
        required: [true, "le mot de passe est obligatoire"]
    },
    role: {
        type: Schema.Types.String,
        enum: Role,
        default: Role.ADMIN
    }

}, {
    timestamps: true
})

adminSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})


const Admin = model('Admin', adminSchema)
//write actions, they gonna be used in controllers, it is a practice to keep them abstracted

export default Admin