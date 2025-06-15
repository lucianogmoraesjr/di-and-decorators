import { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../../application/controllers/authenticate-controller'
import { GetUserProfileController } from '../../application/controllers/get-user-profile-controller'
import { Registry } from '../../kernel/di/registry'
import { fastifyHttpAdapter } from '../adapters/fastify-http-adapter'

export async function routes(app: FastifyInstance) {
  const container = Registry.getInstance()

  const controller = container.resolve(AuthenticateController)
  const getUserProfileController = container.resolve(GetUserProfileController)

  app.post('/authenticate', fastifyHttpAdapter(controller))
  app.get('/users/:userId', fastifyHttpAdapter(getUserProfileController))
}
