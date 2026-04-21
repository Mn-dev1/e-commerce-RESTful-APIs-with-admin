import {Schema, model} from 'mongoose'
import Product from './product.model.js'
import Client from './client.model.js'
import { EtatCommande } from '../utils/enums.js'

const commandeSchema = new Schema({
    client: {type: Schema.Types.ObjectId, ref: Client},
    products: [{
        product: {type: Schema.Types.ObjectId, ref: 'Product'}, 
        qte: {type: Schema.Types.Number}, 
        prix: {type: Schema.Types.Number}
    }],
    total: {
        type: Schema.Types.Number,
        default: 0
    },
    etat: {
        type: Schema.Types.String,
        enum: EtatCommande,
        default: 'En attente'
    }
}, {timestamps: true})

const Commande = model('Commande', commandeSchema)
export default Commande