import {Schema, model} from 'mongoose'

const refreshTokenSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'Admin'
    },
    token: {
        type: Schema.Types.String,
    }
},{
    timestamps: true
})

refreshTokenSchema.index({ updatedAt: 1 }, { expireAfterSeconds: 30 * 86400 });

const refreshTokens = model('refreshTokens', refreshTokenSchema)
export default refreshTokens