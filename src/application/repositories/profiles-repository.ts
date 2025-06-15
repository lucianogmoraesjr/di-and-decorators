import { Profile } from '../entities/profile'

export abstract class ProfilesRepository {
  abstract findByUserId(userId: string): Promise<Profile | null>
}
