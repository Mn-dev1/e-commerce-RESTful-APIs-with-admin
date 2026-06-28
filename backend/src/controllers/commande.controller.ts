import express from "express"
import Commande from "../models/commande.model.js"
import { get, deleteOne, update } from "./handlerFactory.js"
import { StatusCodes } from "http-status-codes"
import Panier from "../models/panier.model.js"
import Product from "../models/product.model.js"

const addCommande = async (req: express.Request, res: express.Response) => {
    const panier = await Panier.findById(req.params.id)
    if (!panier) return res.status(StatusCodes.NOT_FOUND).json('votre panier est vide')
    const total = panier.total + parseInt(req.body.livraison)
    const commande = await Commande.create({
        client: panier.client,
        produits: panier.produits,
        ...req.body,
        total})
    if (commande) {
        // const bulkOption = panier.produits.map((produit) => ({
        //     updateOne: {
        //         filter: { _id: produit.id },
        //         update: { $inc: { qte: -produit.qte} },
        //     },
        // }))
        // await Product.bulkWrite(bulkOption, {})
        panier.produits.map(async (produit) => {
            const prod = await Product.findById(produit.id)
            if(prod) 
                prod.qte = prod.qte - produit.qte

        })

        await Panier.findByIdAndDelete(req.params.id)
        return res.status(StatusCodes.CREATED).json(`commande ajoutée`)
    }

}

const updateCommande = update(Commande)

const getCommandes = get(Commande)

const deleteCommande = deleteOne(Commande)

export { addCommande, updateCommande, getCommandes, deleteCommande }