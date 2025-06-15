import { Injectable } from '../../kernel/decorators/injectable'
import { User } from '../entities/user'

@Injectable()
export class InMemoryUsersRepository {
  public users: User[] = [
    {
      id: '123',
      email: 'johnm@mail.com',
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

  async create(user: User): Promise<void> {
    this.users.push(user)
  }
}
