import argon2 from "argon2"

const encryptPassword = async (password: string): Promise<string> => {
  return argon2.hash(password)
}

export default encryptPassword