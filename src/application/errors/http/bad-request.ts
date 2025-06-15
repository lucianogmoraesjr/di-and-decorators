import { ErrorCode } from '../error-code'
import { HttpError } from './http-error'

export class BadRequest extends HttpError {
  public override statusCode = 400
  public override code: ErrorCode

  constructor(message?: string, code?: ErrorCode) {
    super()

    this.name = 'BadRequest'
    this.message = message ?? 'Bad request'
    this.code = code ?? ErrorCode.BAD_REQUEST
  }
}
