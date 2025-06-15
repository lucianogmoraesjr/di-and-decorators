import { Injectable } from '../../../kernel/decorators/injectable'
import { BadRequest } from '../../errors/http/bad-request'
import { InMemoryUsersRepository } from '../../repositories/in-memory-users-repository'

@Injectable()
export class AuthenticateUseCase {
  constructor(private usersRepository: InMemoryUsersRepository) {}

  async execute({
    email,
  }: AuthenticateUseCase.Input): Promise<AuthenticateUseCase.Output> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) throw new BadRequest('User not found')

    return {
      accessToken: `access-token-123-${email}`,
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
