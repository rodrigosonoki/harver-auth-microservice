import User from "../models/User";

function createUserRepository() {
  const findByEmail = async (email) => await User.findOne({ email });
  const insert = async (user) => {
    const newUser = new User({
      email: user.email,
      password: user.password,
    });
    return await newUser.save();
  };

  return {
    findByEmail,
    insert,
  };
}

export default createUserRepository;
