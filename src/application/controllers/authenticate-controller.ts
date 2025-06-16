import { injectable } from 'inversify'
import { Schema } from '../../kernel/decorators/schema'
import { Controller } from '../contracts/controller'
import { AuthenticateUseCase } from '../use-cases/authentication/authenticate-use-case'
import {
  AuthenticateBody,
  authenticateSchema,
} from './schemas/authenticate-schema'

@injectable()
@Schema(authenticateSchema)
export class AuthenticateController extends Controller<{
  accessToken: string
}> {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {
    super()
  }

  protected override async handle(
    request: Controller.Request<AuthenticateBody>,
  ): Promise<Controller.Response<{ accessToken: string }>> {
    const { email, password } = request.body

    const { accessToken } = await this.authenticateUseCase.execute({
      email,
      password,
    })

    return {
      statusCode: 200,
      body: {
        accessToken,
      },
    }
  }
}
