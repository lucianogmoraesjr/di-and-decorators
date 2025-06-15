import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { ZodError } from 'zod'
import { ErrorCode } from '../../application/errors/error-code'
import { HttpError } from '../../application/errors/http/http-error'

export function errorHandler(
  error: FastifyError,
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  if (error instanceof ZodError) {
    reply.status(400).send({
      body: {
        error: {
          code: ErrorCode.VALIDATION,
          message: error.issues.map((issue) => ({
            field: issue.path.join('.'),
            error: issue.message,
          })),
        },
      },
    })
  }

  if (error instanceof HttpError) {
    reply.status(error.statusCode).send({
      body: {
        error: {
          code: error.code,
          message: error.message,
        },
      },
    })
  }

  console.error(error)

  reply.status(500).send({
    body: {
      error: {
        code: ErrorCode.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
      },
    },
  })
}
