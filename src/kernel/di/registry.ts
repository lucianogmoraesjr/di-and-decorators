// src/kernel/di/registry.ts
import { ClassType, Constructor } from '../../shared/types/constructor'

export class Registry {
  private static instance: Registry | null = null

  public static getInstance(): Registry {
    if (!this.instance) {
      this.instance = new Registry()
    }

    return this.instance
  }

  private constructor() {}

  private readonly providers = new Map<string, Registry.Provider>()
  private readonly bindings = new Map<ClassType<any>, Constructor<any>>()

  register<T>(impl: Constructor<T>): void {
    const token = impl.name

    if (this.providers.has(token)) {
      throw new Error(
        `Provider "${token}" is already registered in the registry.`,
      )
    }

    const deps = Reflect.getMetadata('design:paramtypes', impl) ?? []

    this.providers.set(token, { impl, deps })

    this.detectAndRegisterAbstractions(impl)
  }

  private detectAndRegisterAbstractions<T>(impl: Constructor<T>): void {
    const proto = Object.getPrototypeOf(impl.prototype)
    if (proto && proto.constructor && proto.constructor.name !== 'Object') {
      this.bind(proto.constructor as ClassType, impl)
    }
  }

  bind<A, T extends A>(
    abstraction: ClassType<A>,
    implementation: Constructor<T>,
  ): void {
    this.bindings.set(abstraction, implementation)
  }

  resolve<T>(token: ClassType<T>): T {
    const boundImpl = this.bindings.get(token)
    if (boundImpl) {
      return this.resolve(boundImpl as Constructor<T>)
    }

    if (token.toString().includes('class')) {
      const tokenAsFunction = token as Function
      if (tokenAsFunction.toString().includes('abstract')) {
        throw new Error(
          `Abstract class "${token.name}" must have a binding to a concrete implementation.`,
        )
      }
    }

    const provider = this.providers.get(token.name)

    if (!provider) {
      throw new Error(`Provider "${token.name}" is not registered.`)
    }

    const deps = provider.deps.map((dep) => {
      try {
        return this.resolve(dep)
      } catch (error) {
        for (const [abstractionKey, implKey] of this.bindings.entries()) {
          if (
            dep === abstractionKey ||
            (dep.prototype &&
              abstractionKey.prototype &&
              dep.prototype instanceof abstractionKey)
          ) {
            return this.resolve(implKey)
          }
        }

        throw error
      }
    })

    const instance = new provider.impl(...deps) as T

    return instance
  }
}

export namespace Registry {
  export type Provider = {
    impl: Constructor<any>
    deps: ClassType<any>[]
  }
}
