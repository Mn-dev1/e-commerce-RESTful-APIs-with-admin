import express from "express";
import { StatusCodes } from "http-status-codes";
import { Model } from "mongoose";

const add = (model: Model<any>) => async (req: express.Request, res: express.Response) => {
    const document = await model.create(req.body)
    return res.status(StatusCodes.CREATED).json(`${model.modelName} ajoutée`)
}

const get = (model: Model<any>) => async (req: express.Request, res: express.Response) => {
    const document = await model.find({})
    return res.status(StatusCodes.OK).json({ results: document.length, data: document })
}

const update = (model: Model<any>) => async (req: express.Request, res: express.Response) => {
    const document = await model.findByIdAndUpdate(req.params.id, req.body)
    if (!document)
        return res.status(StatusCodes.NOT_FOUND).json(`no ${model.modelName}`) //kayna 7aja hna ta3 l error api makemlthach
    return res.status(StatusCodes.OK).json(`${model.modelName} modifiée`)
}

const deleteOne = (model: Model<any>) => async (req: express.Request, res: express.Response) => {
    const document = await model.findByIdAndDelete(req.params.id)
    if (!document)
        return res.status(StatusCodes.NOT_FOUND).json(`no ${model.modelName}`)
    return res.status(StatusCodes.NO_CONTENT).json(`${model.modelName} supprimée`)// mayaafichich l msg hna 
}
export { add, get, update, deleteOne }