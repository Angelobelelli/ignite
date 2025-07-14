import { expect, describe, it } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUserCase } from './authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate Use Case', () => {
  it('should be able to register', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserCase(userRepository)

    await userRepository.create({
      name: 'John Doe',
      email: 'Angelobelelli@gmail.com',
      password_hash: await hash('123456', 6),
    })

    const { user } = await sut.execute({
      email: 'Angelobelelli@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should not be able to register with invalid email', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserCase(userRepository)

    expect(() =>
      sut.execute({
        email: 'Angelobelelli@gmail',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
  it('should not be able to register with invalid password', async () => {
    const userRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUserCase(userRepository)
    await userRepository.create({
      name: 'John Doe',
      email: 'Angelobelelli@gmail.com',
      password_hash: await hash('123456', 6),
    })
    expect(() =>
      sut.execute({
        email: 'Angelobelelli@gmail.com',
        password: '12345',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
