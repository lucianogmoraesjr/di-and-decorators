import { FastifyInstance } from 'fastify'
import { AuthenticateController } from '../../application/controllers/authenticate-controller'
import { Registry } from '../../kernel/di/registry'
import { fastifyHttpAdapter } from '../adapters/fastify-http-adapter'

export async function routes(app: FastifyInstance) {
  const controller = Registry.getInstance().resolve(AuthenticateController)

  app.post('/authenticate', fastifyHttpAdapter(controller))
}
