import { User } from '../entities/user'

export interface UserWithProfile {
  id: string
  name: string
  email: string
  dateOfBirth: Date
  phone: string
  avatarImgKey: string
}

export abstract class UsersRepository {
  abstract findById(id: string): Promise<User | null>
  abstract findByEmail(email: string): Promise<User | null>
  abstract findProfileByUserId(userId: string): Promise<UserWithProfile | null>
  abstract create(user: User): Promise<void>
}
