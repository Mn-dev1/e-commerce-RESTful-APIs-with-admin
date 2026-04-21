import { Schema, model} from 'mongoose'
import validator from "email-validator"
import { Role } from "../utils/enums.js"
import {compare, hash, genSalt} from "bcrypt"
import jwt from 'jsonwebtoken'
import type { StringValue } from 'ms';

const adminSchema = new Schema({
    username: {
        type: Schema.Types.String,
        trim: true,
        minlength: 3,
        required: [true, "le nom de l'admin est obligatoire"],
        unique: [true, "ce nom existe déjà"],
        maxlength: 100
    },
    email: {
        type: Schema.Types.String,
        trim: true,
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

}, { timestamps: true,
    methods: {
        createAccessToken(){
            return jwt.sign({ userId: this._id, role: this.role }, process.env.JWT_SECRET as string, { expiresIn: process.env.ACCESS_TOKEN_EXPIRESIN as StringValue })
        },
        createRefreshToken(){
            return jwt.sign({ userId: this._id }, process.env.JWT_REFRESH_SECRET as string, { expiresIn: process.env.REFRESH_TOKEN_EXPIRESIN as StringValue })
        },
        async checkPassword(password: string){
            return await compare(password, this.password)
        }
    }
},)

adminSchema.pre("save", async function () {
    if (this.isModified("password")) {
        const salt = await genSalt(10)
        this.password = await hash(this.password, salt)
    }
})


const Admin = model('Admin', adminSchema)
//write actions, they gonna be used in controllers, it is a practice to keep them abstracted

export default Admin