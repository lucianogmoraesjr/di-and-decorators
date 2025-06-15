import { BadRequest } from '../../errors/http/bad-request'
import { UsersRepository } from '../../repositories/users-repository'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    email,
  }: AuthenticateUseCase.Input): Promise<AuthenticateUseCase.Output> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new BadRequest('User not found')

    return {
      accessToken: `access-token-${user.id}-${user.name.toLowerCase().split(' ').join('-')}`,
    }
  }
}

export namespace AuthenticateUseCase {
  export type Input = {
    email: string
    password: string
  }

  export type Output = {
    accessToken: string
  }
}
