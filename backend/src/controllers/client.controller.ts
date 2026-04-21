import express from "express"
import Client from "../models/client.model.js"
import { add, get,update, deleteOne } from "./handlerFactory.js"

const addClient = add(Client)

const getClients = get(Client)

// deleteClient, updateClient,

export {addClient, getClients}

