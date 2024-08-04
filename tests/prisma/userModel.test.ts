import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

describe("User model tests", () => {
  beforeAll(async () => {
    // Limpar a coleção de usuários antes de começar os testes
    await prisma.user.deleteMany()
  })

  afterAll(async () => {
    // Limpar a coleção de usuários antes de começar os testes
    await prisma.user.deleteMany()
    // Desconectar o cliente Prisma após os testes
    await prisma.$disconnect();
  })

  it('should create a new user', async () => {
    const user = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'testuser@example.com',
        password: '123456'
      },
    })

    expect(user).toHaveProperty('id')
    expect(user.name).toBe('Test User')
    expect(user.email).toBe('testuser@example.com')
  })

  it('should update an existing user', async () => {
    // Primeiro, cria um usuário para atualizar
    const user = await prisma.user.create({
      data: {
        name: 'Usuário Original',
        email: 'original@exemplo.com',
        password: 'senhaOriginal'
      }
    })

    // Atualiza o usuário
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: 'Usuário Atualizado',
        email: 'atualizado@exemplo.com',
        password: 'senhaAtualizada'
      }
    })

    // Verifica se o usuário foi atualizado corretamente
    expect(updatedUser).toHaveProperty('id')
    expect(updatedUser.name).toBe('Usuário Atualizado')
    expect(updatedUser.email).toBe('atualizado@exemplo.com')
    expect(updatedUser.password).toBe('senhaAtualizada')
  })

  it('should delete an existing user', async () => {
    // Cria um usuário para excluir
    const user = await prisma.user.create({
      data: {
        name: 'Usuário para Excluir',
        email: 'excluir@exemplo.com',
        password: 'senhaParaExcluir'
      }
    })

    // Exclui o usuário
    const deletedUser = await prisma.user.delete({
      where: { id: user.id }
    })

    // Verifica se o usuário foi excluído
    expect(deletedUser).toHaveProperty('id')
    expect(deletedUser.name).toBe('Usuário para Excluir')
    expect(deletedUser.email).toBe('excluir@exemplo.com')
    expect(deletedUser.password).toBe('senhaParaExcluir')

    // Verifica se o usuário foi removido do banco de dados
    const foundUser = await prisma.user.findUnique({
      where: { id: user.id }
    })
    
    expect(foundUser).toBeNull() // Espera-se que o usuário não exista mais
  })

  it('should list all users', async () => {
    const users = await prisma.user.findMany()
    expect(users.length).toBeGreaterThan(0)
  })
})