import { Profile } from '../entities/profile'
import { ProfilesRepository } from './profiles-repository'

export class InMemoryProfilesRepository implements ProfilesRepository {
  public profiles: Profile[] = [
    {
      id: '321',
      userId: '123',
      avatarImgKey: 'bucket/users/123/avatar.png',
      dateOfBirth: new Date('1997-08-30'),
      phone: '5551912345678',
    },
  ]

  async findByUserId(userId: string): Promise<Profile | null> {
    const profile = this.profiles.find((profile) => profile.userId === userId)

    if (!profile) {
      return null
    }

    return profile
  }
}
