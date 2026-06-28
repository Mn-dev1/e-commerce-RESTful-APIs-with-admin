import express from "express"
import Client from "../models/client.model.js"
import { add, get } from "./handlerFactory.js"

const addClient = add(Client)

const getClients = get(Client)

export {addClient, getClients}

