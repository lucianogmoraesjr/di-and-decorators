import { InMemoryUsersRepository } from '../../application/repositories/in-memory-users-repository'
import { UsersRepository } from '../../application/repositories/users-repository'
import { Registry } from './registry'

export function setupContainer() {
  const container = Registry.getInstance()

  container.bind(UsersRepository, InMemoryUsersRepository)

  return container
}
