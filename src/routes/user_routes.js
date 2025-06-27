import {Router} from 'express'
import userController from '../controller/user_controllers.js'
import {validate, validateUserId} from '../middlewares/validation_middlewares.js'
import {userSchema} from '../schema/user_schema.js'
import { authMiddleWare } from '../middlewares/auth_middleware.js'
const router = Router()


router.post('/users',validate(userSchema), userController.createUserController)
router.post('/users/login',userController.loginUserController)
router.use(authMiddleWare)
router.get("/users", userController.findAllUserController)
router.get("/users/:id",validateUserId, userController.findUserByIdController)
router.patch("/users/:id",validateUserId, userController.updateUserController)
router.delete("/users/:id", validateUserId, userController.deleteUserController)



export default router