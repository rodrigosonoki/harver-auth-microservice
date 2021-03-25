const bcrypt = require("bcrypt");

export default async function makeHashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt)
    return encryptedPassword
}