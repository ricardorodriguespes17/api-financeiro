import argon2 from "argon2"
import encryptPassword from "../../src/utils/encryptPassword"

jest.mock("argon2")

describe("encryptPassword", () => {
  it("should hash the password", async () => {
    const password = "mySecurePassword"
    const hashedPassword = "hashedPassword";

    (argon2.hash as jest.Mock).mockResolvedValue(hashedPassword)

    const result = await encryptPassword(password)

    expect(argon2.hash).toHaveBeenCalledWith(password)
    expect(result).toBe(hashedPassword)
  })

  it("should throw an error if argon2.hash fails", async () => {
    const password = "mySecurePassword"
    const errorMessage = "Hashing failed";

    // Define o comportamento do mock para lançar um erro
    (argon2.hash as jest.Mock).mockRejectedValue(new Error(errorMessage))

    await expect(encryptPassword(password)).rejects.toThrow(errorMessage)
  })
})
