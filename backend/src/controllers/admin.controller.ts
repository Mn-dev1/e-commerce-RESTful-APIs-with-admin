import express from "express"
import Admin from "../models/admin.model.js"
import { add, get, update, deleteOne } from "./handlerFactory.js"

const addAdmin = add(Admin)

const deleteAdmin = deleteOne(Admin)

const updateAdmin = update(Admin)

const getAdmins = get(Admin)

export {addAdmin, deleteAdmin, updateAdmin, getAdmins}