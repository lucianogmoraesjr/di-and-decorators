import { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../../application/controllers/authenticate-controller'
import { GetUserProfileController } from '../../application/controllers/get-user-profile-controller'
import { fastifyHttpAdapter } from '../adapters/fastify-http-adapter'
import { container } from '../container'

export async function routes(app: FastifyInstance) {
  const authenticateController = container.get(AuthenticateController)
  const getUserProfileController = container.get(GetUserProfileController)

  app.post('/authenticate', fastifyHttpAdapter(authenticateController))
  app.get('/users/:userId', fastifyHttpAdapter(getUserProfileController))
}
