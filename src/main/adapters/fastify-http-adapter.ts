import { FastifyReply, FastifyRequest } from 'fastify'
import { Controller } from '../../application/contracts/controller'

export function fastifyHttpAdapter(controller: Controller<unknown>) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const body = request.body as Controller.Request['body']
    const params = request.params as Controller.Request['params']
    const queryParams = request.query as Controller.Request['queryParams']

    const response = await controller.execute({
      body,
      params,
      queryParams,
    })

    reply.status(response.statusCode).send(response.body)
  }
}
