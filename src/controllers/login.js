import User from '../models/User'
import comparePassword from '../use-cases/comparePassword'
import generateJwt from '../use-cases/generateJwt'

export default async function makeLogin(req, res) {
    const { email, password } = req.body

    //FIND USER
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: "Usuário não encontrado." })

    //COMPARTE PASSWORD
    const isValid = await comparePassword(password, user.password)
    if (!isValid) return res.status(400).json({ msg: "Senha inválida." })

    //GENERATE TOKEN
    const token = generateJwt(user)

    return res.header('auth-token', token).json({ token })
  }