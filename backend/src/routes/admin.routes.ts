import express from "express"
import {deleteAdmin, getAdmins, updateAdmin} from "../controllers/admin.controller.js"
import {deleteAdminValidator, updateAdminValidator } from "../utils/validators/adminValidators.js"
import registerValidator from "../utils/validators/authValidators.js"
import {register} from "../controllers/auth.controller.js"
import {authenticate, authorize} from "../middlewares/authMiddleware.js"
import {Role} from '../utils/enums.js'

const adminRouter = express.Router()

adminRouter.route('/').get(authenticate, authorize(Role.SUPER_ADMIN), getAdmins)
                      .post(authenticate, authorize(Role.SUPER_ADMIN),registerValidator, register)
                      
adminRouter.route('/:id').delete(authenticate, authorize(Role.SUPER_ADMIN), deleteAdminValidator, deleteAdmin)
                         .put(authenticate, authorize(Role.SUPER_ADMIN, Role.ADMIN), updateAdminValidator, updateAdmin)

export default adminRouter