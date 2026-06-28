import { Schema, model } from 'mongoose'
import Product from './product.model.js'
import Client from './client.model.js'
import { EtatCommande } from '../utils/enums.js'
import { Wilaya } from '../utils/enums.js'

interface IProduit {
    id: Schema.Types.ObjectId
    prix: number
    qte: number
}

interface ICommande extends Document {
    client: Schema.Types.ObjectId
    produits: IProduit[]
    adresse: string
    commune: string
    wilaya: string
    livraison: number
    total: number
    notes: string
    etat: string
    calculTotal(): number
}

const commandeSchema = new Schema<ICommande>({
    client: { type: Schema.Types.ObjectId, ref: Client },
    produits: [{
        id: { type: Schema.Types.ObjectId, ref: Product },
        qte: { type: Schema.Types.Number, default: 1 },
        prix: { type: Schema.Types.Number, default: 0 }
    }],
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
    livraison: {
        type: Schema.Types.Number,
        default: 0,
    },
    total: {
        type: Schema.Types.Number,
        default: 0
    },
    notes: {
        type: Schema.Types.String,
        maxlength: 100,
    },
    etat: {
        type: Schema.Types.String,
        enum: EtatCommande,
        default: 'En attente'
    },
}, { timestamps: true})

const Commande = model('Commande', commandeSchema)
export default Commande