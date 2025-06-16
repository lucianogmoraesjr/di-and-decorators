import { FastifyInstance } from 'fastify'
import { Container } from 'inversify'
import { AuthenticateController } from '../../application/controllers/authenticate-controller'
import { GetUserProfileController } from '../../application/controllers/get-user-profile-controller'
import { InMemoryProfilesRepository } from '../../application/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from '../../application/repositories/in-memory-users-repository'
import { ProfilesRepository } from '../../application/repositories/profiles-repository'
import { UsersRepository } from '../../application/repositories/users-repository'
import { fastifyHttpAdapter } from '../adapters/fastify-http-adapter'

export async function routes(app: FastifyInstance) {
  const container = new Container({
    autoBindInjectable: true,
  })

  container.bind(UsersRepository).to(InMemoryUsersRepository)
  container.bind(ProfilesRepository).to(InMemoryProfilesRepository)

  const authenticateController = container.get(AuthenticateController)
  const getUserProfileController = container.get(GetUserProfileController)

  app.post('/authenticate', fastifyHttpAdapter(authenticateController))
  app.get('/users/:userId', fastifyHttpAdapter(getUserProfileController))
}
