import { Constructor } from '../../shared/types/constructor'
import { Registry } from '../di/registry'

export function Injectable(): ClassDecorator {
  return (target) => {
    Registry.getInstance().register(target as unknown as Constructor)
  }
}
