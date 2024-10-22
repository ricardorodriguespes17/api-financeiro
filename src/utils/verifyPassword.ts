import argon2 from "argon2"

const verifyPassword = async (hash: string, password: string) => {
  try {
    return await argon2.verify(hash, password)
  } catch (err) {
    console.error("Erro ao verificar a senha:", err);
    return false
  }
}

export default verifyPassword