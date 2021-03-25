import bcrypt from 'bcrypt'

export default async function comparePassword(password, userPassword) {
    const isValid = await bcrypt.compare(password, userPassword)
    return isValid
}