import {Router} from 'express'
import userController from '../controller/user_controllers.js'

const router = Router()


router.post('/users', userController.createUserController)

export default router