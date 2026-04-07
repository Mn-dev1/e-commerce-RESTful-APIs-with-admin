// kayen li ysemi l folder ta3 controllers services
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import Category from '../models/category.model.js'
import {add, get, update, deleteOne} from './handlerFactory.js'
//const slugify = require('slugify)

// const category = await Category.create({ ...req.body }) //mch 3aref a catch l error eli gay mn async await
const addCategory = add(Category)
// ki ndir res.send mana7tajech next function
const getCategories = get(Category)

const updateCategory = update(Category)

const deleteCategory = deleteOne(Category)

export { getCategories, addCategory, updateCategory, deleteCategory }