// kayen li ysemi l folder ta3 controllers services
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import Category from '../models/category.model.js'
import {add, update, deleteOne} from './handlerFactory.js'
//const slugify = require('slugify)

// const category = await Category.create({ ...req.body }) //mch 3aref a catch l error eli gay mn async await
const addCategory = add(Category)

const getCategories = async (req: express.Request, res: express.Response) => {// ki ndir res.send mana7tajech next function
    //try w catch hiya li t5alina ntal3ou l error ll user
    const categories = await Category.find({})
    return res.status(StatusCodes.OK).json({ results: categories.length, data: categories })
}

const updateCategory = update(Category)

const deleteCategory = deleteOne(Category)

export { getCategories, addCategory, updateCategory, deleteCategory }