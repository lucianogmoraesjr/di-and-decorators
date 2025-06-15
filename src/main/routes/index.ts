import { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../../application/controllers/authenticate-controller'
import { GetUserProfileController } from '../../application/controllers/get-user-profile-controller'
import { InMemoryProfilesRepository } from '../../application/repositories/in-memory-profiles-repository'
import { InMemoryUsersRepository } from '../../application/repositories/in-memory-users-repository'
import { AuthenticateUseCase } from '../../application/use-cases/authentication/authenticate-use-case'
import { GetUserProfileUseCase } from '../../application/use-cases/users/get-user-profile-use-case'
import { fastifyHttpAdapter } from '../adapters/fastify-http-adapter'

export async function routes(app: FastifyInstance) {
  const profilesRepository = new InMemoryProfilesRepository()
  const usersRepository = new InMemoryUsersRepository(profilesRepository)
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)
  const authenticateController = new AuthenticateController(authenticateUseCase)

  const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository)
  const getUserProfileController = new GetUserProfileController(
    getUserProfileUseCase,
  )

  app.post('/authenticate', fastifyHttpAdapter(authenticateController))
  app.get('/users/:userId', fastifyHttpAdapter(getUserProfileController))
}
