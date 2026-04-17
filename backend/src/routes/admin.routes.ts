import express from "express"
import {deleteAdmin, updateAdmin, getAdmins} from "../controllers/admin.controller.js"
import { getAllProducts } from "../controllers/product.controller.js"
import {updateAdminValidator, deleteAdminValidator } from "../utils/validators/adminValidators.js"
import registerValidator from "../utils/validators/authValidators.js"
import {register} from "../controllers/auth.controller.js"
import {authenticate, authorize} from "../middlewares/authMiddleware.js"
import {Role} from '../utils/roles.js'

const adminRouter = express.Router()

adminRouter.route('/').get(authenticate, authorize(Role.SUPER_ADMIN), getAdmins)
adminRouter.route('/register').post(authenticate, authorize(Role.SUPER_ADMIN),registerValidator, register)
adminRouter.route('/:id').delete(authenticate, authorize(Role.SUPER_ADMIN), deleteAdminValidator, deleteAdmin)
adminRouter.route('/info/:id').put(authenticate, authorize(Role.ADMIN), updateAdminValidator, updateAdmin)
adminRouter.route('/products').get(authenticate, getAllProducts)


export default adminRouter