import express from "express";
import Product from "../models/product.model.js";
import { StatusCodes } from "http-status-codes";
import { add, update, deleteOne } from "./handlerFactory.js"
import ApiFeatures from "../utils/apiFeatures.js"
import type { ObjectId, Schema } from "mongoose";

const addProduct = add(Product)

const getAllProducts = async (req: express.Request, res: express.Response) => {
    //try w catch hiya li t5alina ntal3ou l error ll user
    const features = new ApiFeatures(Product.find({}), req.query).filter().search().sort().fieldsLimiting().paginate()

    //execute the query with await 
    const products = await features.mongooseQuery
    return res.status(StatusCodes.OK).json({ results: products.length, data: products })
}

const updateProduct = update(Product)

const deleteProduct = deleteOne(Product)

export { getAllProducts, addProduct, updateProduct, deleteProduct }
