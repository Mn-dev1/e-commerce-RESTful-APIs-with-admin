import {Schema, model} from 'mongoose'
import Category from './category.model.js'

const productSchema = new Schema({
    designation: {
        type: Schema.Types.String,
        trim: true,
        required: [true, "la designation de produit est obligatoire"],//hadou les message derthoum deja f validator est ce que na7ihoum ?
        unique: [true, "ce produit existe déjà"],
        maxlength: 32
    },
    qte:{
        type: Schema.Types.Number,
        required: [true, "la quantite est obligatoire"],
    },
    prix:{
        type: Schema.Types.Number,
        required: [true, "le prix est obligatoire"]
    },
    description: Schema.Types.String,
    imageCover: {
        type: Schema.Types.String,
        required: [true, "image de produit est obligatoire"]
    },
    images: [Schema.Types.String],
    colors: [Schema.Types.String],
    category: {
        type: Schema.Types.ObjectId, 
        ref: Category,
        required: [true, "categorie obligatoire"]
    }//normalment nzid id admin comme cle etranger ms mch ra7 nzidha w nchouf
}, {
    timestamps: true 
})

const Product = model('Produit', productSchema)
export default Product