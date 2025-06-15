import { Injectable } from '../../../kernel/decorators/injectable'

@Injectable()
export class AuthenticateUseCase {
  constructor() {}

  async execute({
    email,
  }: AuthenticateUseCase.Input): Promise<AuthenticateUseCase.Output> {
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
