export type Constructor<T = any> = new (...args: any[]) => T

export type AbstractConstructor<T = any> = abstract new (...args: any[]) => T

export type ClassType<T = any> = Constructor<T> | AbstractConstructor<T>
