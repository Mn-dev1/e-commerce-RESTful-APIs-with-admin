import express from "express";
import Product from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";
import { add, update, deleteOne } from "./handlerFactory.js"
import ApiFeatures from "../utils/apiFeatures.js"

const addProduct = add(Product)

const getAllProducts = async (req: express.Request, res: express.Response) => {
    //build the query
    let mongooseQuery = Product.find({})

    //2) filtration 
    ApiFeatures.filter(Product, mongooseQuery, req.query)

    //1) pagination
    ApiFeatures.paginate(mongooseQuery, req.query)
    
    //3) sorting
    if (req.query.sort)// ya3ni ida req.query fiha sort
        ApiFeatures.sort(mongooseQuery, req.query)
    else
        mongooseQuery = mongooseQuery.sort('-createdAt')

    //4) fileds limiting
    if (req.query.fields) 
        ApiFeatures.fieldsLimiting(mongooseQuery, req.query)
    else
        mongooseQuery = mongooseQuery.select(["-__v"])

    //5) search
    if (req.query.keyword) 
        ApiFeatures.search(Product, mongooseQuery, req.query)
    else
        mongooseQuery = Product.find()

    //execute the query with await 
    const products = await mongooseQuery
    return res.status(StatusCodes.OK).json({ results: products.length, data: products })
}

const getAllCategoryProducts = async (req: express.Request, res: express.Response) => {
    const products = await Product.find(req.params)
    return res.status(StatusCodes.OK).json({ results: products.length, data: products })
}

const updateProduct = update(Product)

const deleteProduct = deleteOne(Product)

export { getAllProducts, getAllCategoryProducts, addProduct, updateProduct, deleteProduct }
