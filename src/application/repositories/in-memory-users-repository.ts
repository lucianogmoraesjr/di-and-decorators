import { User } from '../entities/user'
import { InMemoryProfilesRepository } from './in-memory-profiles-repository'
import { UsersRepository, UserWithProfile } from './users-repository'

export class InMemoryUsersRepository implements UsersRepository {
  constructor(
    private readonly profilesRepository: InMemoryProfilesRepository,
  ) {}

  public users: User[] = [
    {
      id: '123',
      email: 'john@mail.com',
      name: 'John Doe',
      password: '123456',
    },
  ]

  async findById(id: string): Promise<User | null> {
    const user = this.users.find((user) => user.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async findProfileByUserId(userId: string): Promise<UserWithProfile | null> {
    const user = this.users.find((user) => user.id === userId)

    if (!user) return null

    const profile = this.profilesRepository.profiles.find(
      (profile) => profile.userId === userId,
    )

    if (!profile) return null

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      avatarImgKey: profile.avatarImgKey,
    }
  }

  async create(user: User): Promise<void> {
    this.users.push(user)
  }
}
