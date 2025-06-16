import { ContainerModule } from 'inversify'
import { InMemoryProfilesRepository } from '../../../application/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from '../../../application/repositories/in-memory-users-repository'
import { ProfilesRepository } from '../../../application/repositories/profiles-repository'
import { UsersRepository } from '../../../application/repositories/users-repository'

export const userModule = new ContainerModule((bind) => {
  bind(UsersRepository).to(InMemoryUsersRepository).inSingletonScope()
  bind(ProfilesRepository).to(InMemoryProfilesRepository).inSingletonScope()
})
