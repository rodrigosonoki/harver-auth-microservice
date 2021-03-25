import User from '../models/User'
import hashPassword from '../use-cases/hashPassword'

export default async function makeRegister(req, res) {
    const { email, password } = req.body
    
    const isRegistered = await User.findOne({ email });

    if (isRegistered) return res.status(400).json({ msg: "E-mail já cadastrado."})

    //HASH PASSWORD
    const encryptedPassword = await hashPassword(password)
      
    try {
        const user = await new User({
            email,
            password: encryptedPassword
        });
        await user.save()
        return res.status(200).json({ msg: "Usuário criado com sucesso!"})
    } catch(err) {
        return res.status(400).json({ err })
    }
}