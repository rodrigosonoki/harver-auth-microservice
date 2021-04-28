import createAuthService from "../services/authService";
import createAuthRepository from "../repositories/authRepository";

import hashPassword from "../utils/hashPassword";

async function register(req, res) {
  const authRepository = createAuthRepository();
  const authService = createAuthService(authRepository);

  const { email, password } = req.body;

  //CHECK IF ALL FIELDS ARE FILLED
  if (!email || !password)
    return res
      .status(404)
      .json({ message: "Todos os campos são obrigatórios." });

  //CHECK IF USER ALREADY EXISTS
  const isRegistered = await authService.find(email);
  if (isRegistered)
    return res.status(400).json({ msg: "E-mail já cadastrado." });

  //HASH PASSWORD
  const encryptedPassword = await hashPassword(password);

  //CREATE USER OBJECT
  const user = {};
  user.email = email;
  user.password = encryptedPassword;

  try {
    await authService.create(user);
    return res.status(201).json({ message: "Usuário criado com sucesso!" });
  } catch (err) {
    return res.status(400).json({
      message: "Edrror creating user.",
    });
  }
}

export default register;
