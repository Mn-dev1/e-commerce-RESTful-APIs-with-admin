import express from "express"
import {addAdmin, deleteAdmin, updateAdmin, getAdmins} from "../controllers/admin.controller.js"
import { getAllProducts } from "../controllers/product.controller.js"
import { addAdminValidator, updateAdminValidator, deleteAdminValidator } from "../utils/validators/adminValidators.js"

const adminRouter = express.Router()

adminRouter.route('/').get(getAdmins).post(addAdminValidator, addAdmin)
adminRouter.route('/:id').delete(deleteAdminValidator, deleteAdmin)
adminRouter.route('/info/:id').put(updateAdminValidator, updateAdmin)
adminRouter.route('/products').get(getAllProducts)


export default adminRouter