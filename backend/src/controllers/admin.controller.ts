import express from "express"
import Admin from "../models/admin.model.js"
import { add, get, deleteOne } from "./handlerFactory.js"
import { StatusCodes } from "http-status-codes";

const addAdmin = add(Admin)

const deleteAdmin = deleteOne(Admin)

const updateAdmin = async (req: express.Request, res: express.Response) => {
    if(req.user.id != req.params.id) return res.sendStatus(StatusCodes.FORBIDDEN)
    
    const admin = await Admin.findById(req.params.id)
    if (!admin)
        return res.status(StatusCodes.NOT_FOUND).json(`no Admin`)
    Object.assign(document, req.body)
    admin.save()
    return res.status(StatusCodes.OK).json(`Admin modifiée`)
}

const getAdmins = get(Admin)

export {addAdmin, deleteAdmin, updateAdmin, getAdmins}