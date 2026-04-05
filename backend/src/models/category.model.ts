import {Schema, model} from 'mongoose'

const categorySchema = new Schema({
    name: {// ida 7aba nzid 7wayej okhra nchouf documantation w 3la 7sab requirements li galouhali
        type: Schema.Types.String,
        trim: true,
        required: [true, "le nom de la categorie est obligatoire"],//hadou les message derthoum deja f validator est ce que na7ihoum ?
        unique: [true, "cette catégorie existe déjà"],
        maxlength: 100
    },
    image: {
        type: Schema.Types.String
    },
    // slug: {
    //     type: Schema.Types.String,
    //     lowercase: true
    // }
}, {
    timestamps: true //tfidni ki n7ab njib most recent categorie or products
})

const Category = model('Catégorie', categorySchema) //modelname , le nom f db w zadelha s 
export default Category