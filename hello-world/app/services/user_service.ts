import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import { RegisteUserDto } from '../dtos/userDtos.js'

export default class UserService {
  public async registerUser(data: RegisteUserDto): Promise<User> {
    const user = new User()
    user.email = data.email
    user.fullName = data.fullName
    user.password = await hash.make(data.password)
    await user.save()

    return user
  }
}
