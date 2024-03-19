import { HttpContext } from '@adonisjs/core/http'
import { RegisteUserDto } from '../dtos/userDtos.js'
import UserService from '#services/user_service'
import { createUserValidator } from '#validators/register'

export default class UsersController {
  public async registerUser({ request, response }: HttpContext) {
    try {
      const { email, password, fullName } = request.all()
      const data: RegisteUserDto = { email, password, fullName }
      const payload = await request.validateUsing(createUserValidator)
      

      if (!data.email || !data.password) {
        return response.status(400).json({
            success: false,
            message: 'email and password is required'
        })
      }

      const user = await new UserService().registerUser(data)
      return response.status(200).json({
        success: true,
        message: 'User registered successfully'
      })
    } catch (error) {
        console.log(error)
        return response.status(500).json({
            success: false,
            error: error,
            message: 'Something went wrong during registration'
        })
    }
  }
}
