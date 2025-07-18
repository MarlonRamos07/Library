import userRepository from "../repositories/user_repositories.js"
import bcrypt from 'bcrypt'
import { generateJWT } from './auth_service.js'


async function createUserService(newUser){

    const foundUser = await userRepository.findUserByEmailRepository(newUser.email)
    if(foundUser) throw new Error("User already exists!")

    const passHash = await bcrypt.hash(newUser.password, 10)
    const user = await userRepository.createUserRepository({...newUser, password: passHash})

    if(!user) throw new Error("Error on creating User")
    const token =  generateJWT(user.id)
    return token

}

async function findAllUsersService() {
    const users = await userRepository.findAllUserRepository()
    return users
}

async function findUserByIdService(id){
    const user = await userRepository.findUserByIdRepository(id)
    if(!user) throw new Error("User not found")
    return user
}

async function updateUserService(newUser, userId){
    const user = await userRepository.findUserByIdRepository(userId)
    if(!user) throw new Error ("User not found")

    if(newUser.password) {
        newUser.password = await bcrypt.hash(newUser.password, 10)
    }
    const userUpdated = userRepository.updateUserRepository(userId, newUser)
    return userUpdated
}

async function deleteUserService(userId) {
    const user = await userRepository.findUserByIdRepository(userId)
    if(!user) throw new Error("User not found")
    const deleteResult = await userRepository.deleteUserRepository(userId)
    
    if (deleteResult) {
        return { message: `User with ID ${userId} deleted successfully.` };
    } else {
        throw new Error(`Failed to delete user with ID ${userId}.`);
    }

}




export default {
    createUserService,
    findAllUsersService,
    findUserByIdService,
    updateUserService,
    deleteUserService
}