import createAuthService from "../services/authService";
import createAuthRepository from "../repositories/authRepository";

import comparePassword from "../utils/comparePassword";
import generateJwt from "../utils/generateJwt";
import hashPassword from "../utils/hashPassword";

function authController() {
  const authRepository = createAuthRepository();
  const authService = createAuthService(authRepository);

  const login = async (req, res) => {
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
  };

  const register = async (req, res) => {
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
      const createdUser = await authService.create(user);
      return res.status(201).json(createdUser);
    } catch (err) {
      return res.status(400).json({
        message: "Error creating user.",
      });
    }
  };

  return {
    login,
    register,
  };
}

export default authController;
