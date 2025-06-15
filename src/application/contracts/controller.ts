import { getSchema } from '../../kernel/decorators/schema'

export abstract class Controller<TResponseBody = undefined> {
  protected abstract handle(
    request: Controller.Request,
  ): Promise<Controller.Response<TResponseBody>>

  public execute(
    request: Controller.Request,
  ): Promise<Controller.Response<TResponseBody>> {
    const body = this.validateBody(request.body)

    return this.handle({
      ...request,
      body,
    })
  }

  private validateBody(body: Controller.Request['body']) {
    const schema = getSchema(this)

    if (!schema) {
      return body
    }

    return schema.parse(body)
  }
}

export namespace Controller {
  export type Request<
    TBody = Record<string, unknown>,
    TParams = Record<string, unknown>,
    TQueryParams = Record<string, unknown>,
  > = {
    body: TBody
    params: TParams
    queryParams: TQueryParams
  }

  export type Response<TBody = undefined> = {
    statusCode: number
    body?: TBody
  }
}
