import { Container } from 'inversify'
import { userModule } from './modules/user-module'

export const container = new Container({
  autoBindInjectable: true,
})

container.load(userModule)
