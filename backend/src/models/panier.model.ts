import { Schema, model } from 'mongoose'
import Product from './product.model.js'
import Client from './client.model.js'

interface IProduit {
    id: Schema.Types.ObjectId
    prix: number
    qte: number
}

interface IPanier extends Document {
    client: Schema.Types.ObjectId
    produits: IProduit[]
    total: number
    calculTotal(): number
}

const panierSchema = new Schema<IPanier>({
    client: { type: Schema.Types.ObjectId, ref: Client, required: true },
    produits: [{
        id: { type: Schema.Types.ObjectId, ref: Product },
        qte: { type: Schema.Types.Number, default: 1 },
        prix: { type: Schema.Types.Number, default: 0 }
    }],
    total: {
        type: Schema.Types.Number,
        default: 0
    }
}, {
    timestamps: true,
    methods: {
        calculTotal() {
            return this.produits.reduce((acc, produit) => {
                return acc + produit.prix * produit.qte
            }, 0)
        }
    }
})

panierSchema.pre("save", function() {
    if (this.isModified('produits')) 
        this.total = this.calculTotal()
})

const Panier = model('Panier', panierSchema)
export default Panier