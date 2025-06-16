import { injectable } from 'inversify'
import { BadRequest } from '../../errors/http/bad-request'
import { UsersRepository } from '../../repositories/users-repository'

@injectable()
export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: GetUserProfileUseCase.Input) {
    const user = await this.usersRepository.findProfileByUserId(userId)

    if (!user) throw new BadRequest('User not found')

    return user
  }
}

export namespace GetUserProfileUseCase {
  export type Input = {
    userId: string
  }

  export type Output = {
    id: string
    name: string
    email: string
    dateOfBirth: Date
    phone: string
    avatarImgKey: string
  }
}
