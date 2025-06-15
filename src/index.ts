import 'reflect-metadata'

import fastify from 'fastify'
import { errorHandler } from './main/middlewares/error-handler'
import { routes } from './main/routes'

const app = fastify()

app.register(routes)

app.setErrorHandler(errorHandler)

app
  .listen({
    port: 3333,
    host: '0.0.0.0',
  })
  .then(() => console.log('> server running on http://localhost:3333'))
