import userRepository from "../repositories/user_repositories.js"

async function createUserService(newUser){
    const user = await userRepository.createUserRepository(newUser)
    return user
}

export default {
    createUserService
}