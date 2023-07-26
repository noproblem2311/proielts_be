import User from 'App/Models/User'

class UserController {

  async index ({ response }) {
    const users = await User.all()
    return response.json(users)
  }

  async show ({ params, response }) {
    const user = await User.find(params.id)
    return response.json(user)
  }

  async store ({ request, response }) {
    const userData = request.only(['username', 'email', 'password'])
    const user = await User.create(userData)
    return response.json(user)
  }

  async update ({ params, request, response }) {
    const userData = request.only(['username', 'email', 'password'])
    const user = await User.find(params.id)

    user.merge(userData)
    await user.save()

    return response.json(user)
  }

  async destroy ({ params, response }) {
    const user = await User.find(params.id)
    await user.delete()

    return response.json({ message: 'User deleted' })
  }

}

export default UserController