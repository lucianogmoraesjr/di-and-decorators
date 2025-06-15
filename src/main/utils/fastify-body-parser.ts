import { RequestBodyDefault } from 'fastify'

export function fastifyBodyParser(body: RequestBodyDefault) {
  if (!body) {
    return {}
  }
}
