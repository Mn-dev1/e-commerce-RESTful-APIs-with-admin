import express from "express"
import {deleteAdmin, updateAdmin, getAdmins} from "../controllers/admin.controller.js"
import { getAllProducts } from "../controllers/product.controller.js"
import {updateAdminValidator, deleteAdminValidator } from "../utils/validators/adminValidators.js"
import registerValidator from "../utils/validators/authValidators.js"
import {register} from "../controllers/auth.controller.js"
import auth from "../middlewares/authMiddleware.js"

const adminRouter = express.Router()

adminRouter.route('/').get(auth, getAdmins)
adminRouter.route('/register').post(auth,registerValidator, register)
adminRouter.route('/:id').delete(auth, deleteAdminValidator, deleteAdmin)
adminRouter.route('/info/:id').put(auth, updateAdminValidator, updateAdmin)
adminRouter.route('/products').get(auth, getAllProducts)


export default adminRouter