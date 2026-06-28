import express from "express"
import Panier from "../models/panier.model.js"
import Product from "../models/product.model.js"
import { add, update, deleteOne} from "./handlerFactory.js"
import { StatusCodes } from "http-status-codes"

const addProductAuPanier = async (req: express.Request, res: express.Response) => {
    const {clientId, productId, qte} = req.body
    const product = await Product.findById(productId)
    if (product){
        let panier = await Panier.findOne({client: clientId})
        if (panier) panier.produits.push({id: productId, qte, prix: product.prix})
        else {
            const panier = await Panier.create({
            client: clientId,
            produits: [{id: productId, qte: qte, prix: product.prix}]})
        }
        
    }
    return res.sendStatus(StatusCodes.CREATED)
}

const getPanier = async (req: express.Request, res: express.Response) => {
    const panier = await Panier.findOne({client: req.params}).select('produits total')
    return res.status(StatusCodes.OK).json({panier})
}

const deletePanier = deleteOne(Panier)

export {addProductAuPanier, getPanier, deletePanier}