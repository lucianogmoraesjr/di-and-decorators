import { Controller } from '../contracts/controller'
import { UserWithProfile } from '../repositories/users-repository'
import { GetUserProfileUseCase } from '../use-cases/users/get-user-profile-use-case'

export class GetUserProfileController extends Controller<UserWithProfile> {
  constructor(private readonly getUserProfileUseCase: GetUserProfileUseCase) {
    super()
  }

  protected override async handle(
    request: Controller.Request<{}, { userId: string }>,
  ): Promise<Controller.Response<UserWithProfile>> {
    const { userId } = request.params

    const profile = await this.getUserProfileUseCase.execute({
      userId,
    })

    return {
      statusCode: 200,
      body: profile,
    }
  }
}
