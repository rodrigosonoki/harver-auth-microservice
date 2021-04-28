import createAuthService from "../services/authService";
import createAuthRepository from "../repositories/authRepository";

import comparePassword from "../utils/comparePassword";
import generateJwt from "../utils/generateJwt";

async function login(req, res) {
  const authRepository = createAuthRepository();
  const authService = createAuthService(authRepository);

  const { email, password } = req.body;

  //CHECK IF ALL FIELDS ARE FILLED
  if (!email || !password)
    return res
      .status(404)
      .json({ message: "Todos os campos são obrigatórios." });

  //FIND USER
  const user = await authService.find(email);
  if (!user) return res.status(400).json({ msg: "Usuário não encontrado." });

  //COMPARE PASSWORD
  const isValid = await comparePassword(password, user.password);
  if (!isValid) return res.status(400).json({ msg: "Senha inválida." });

  //GENERATE TOKEN
  const token = generateJwt(user);
  return res.header("auth-token", token).json({ token });
}

export default login;
