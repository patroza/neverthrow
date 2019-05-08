

export type Result<T, E>
= Ok<T, E>
| Err<T, E>



export const ok = <T, E>(value: T): Ok<T, E> => new Ok(value)

export const err = <T, E>(err: E): Err<T, E> => new Err(err)

function pipe(...fns: Array<UnaryFunction<any, any>>): UnaryFunction<any, any> {
  return pipeFromArray(fns, (prev, fn) => fn(prev));
}

const noop = () => {}

function pipeFromArray<T, R>(fns: Array<UnaryFunction<T, R>>, transform: (prev: any, fn: any) => any): UnaryFunction<T, R> {
  if (!fns) {
    return noop as UnaryFunction<any, any>;
  }

  // if (fns.length === 1) {
  //   return (input) => transform(input, fns[0]);
  // }

  return function piped(input: T): R {
    // .then for Promise
    return fns.reduce((prev: any, fn: UnaryFunction<T, R>) => transform(prev, fn), input as any);
  };
}

export class Ok<T, E> {
  private value: T

  constructor(value: T) {
    this.value = value
  }

  isOk(): this is Ok<T, E> {
    return true
  }

  isErr(): this is Err<T, E> {
    return !this.isOk()
  }

  pipe<A>(op1: OperatorFunction<Result<T, E>, A>): A;
  pipe<A, B>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>): B;
  pipe<A, B, C>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): C;
  pipe<A, B, C, D>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): D;
  pipe<A, B, C, D, E2>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>): E2;
  pipe<A, B, C, D, E2, F>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>): F;
  pipe<A, B, C, D, E2, F, G>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>): G;
  pipe<A, B, C, D, E2, F, G, H>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): H;
  pipe<A, B, C, D, E2, F, G, H, I>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): I;
  pipe<A, B, C, D, E2, F, G, H, I>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): {};
  pipe(...fns: any[]) {
    return pipe(...fns)(this)
  }

  map<A>(f: (t: T) => A): Result<A, E> {
    return ok(f(this.value))
  }

  mapErr<U>(_f: (e: E) => U): Result<T, U> {
    return ok(this.value)
  }

  // add info on how this is really useful for converting a
  // Result<Result<T, E2>, E1>
  // into a Result<T, E2>
  andThen<U>(f: (t: T) => Result<U, E>): Result<U, E> {
    return f(this.value)
  }

  async asyncMap<U>(f: (t: T) => Promise<U>): Promise<Result<U, E>> {
    const newInner = await f(this.value)

    return ok(newInner)
  }

  async asyncAndThen<U>(f: (t: T) => Promise<Result<U, E>>): Promise<Result<U, E>> {
    return await f(this.value)
  }

  // talk about match can be used to unwrap values in a typesafe way
  match = <U, A>(
    ok: (t: T) => U,
    _err: (e: E) => A
  ): U => {
    return ok(this.value)
  }

  async asyncMatch<U, A>(
    ok: (t: T) => Promise<U>,
    _err: (e: E) => Promise<A>
  ): Promise<U> {
    return await ok(this.value)
  }

  // talk about how unwrapping defeats the purpose of Results
  _unsafeUnwrap(): T {
    return this.value
  }

  _unsafeUnwrapErr(): E {
    throw new Error('Called `_unsafeUnwrapErr` on an Ok')
  }
}



interface UnaryFunction<T, R> {
  (source: T): R;
}
interface OperatorFunction<T, R> extends UnaryFunction<T, R> {
}

export class Err<T, E> {
  private error: E

  constructor(error: E) {
    this.error = error
  }

  isOk(): this is Ok<T, E> {
    return false
  }

  isErr(): this is Err<T, E> {
    return !this.isOk()
  }

  pipe<A>(op1: OperatorFunction<Result<T, E>, A>): A;
  pipe<A, B>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>): B;
  pipe<A, B, C>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): C;
  pipe<A, B, C, D>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): D;
  pipe<A, B, C, D, E2>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>): E2;
  pipe<A, B, C, D, E2, F>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>): F;
  pipe<A, B, C, D, E2, F, G>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>): G;
  pipe<A, B, C, D, E2, F, G, H>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): H;
  pipe<A, B, C, D, E2, F, G, H, I>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): I;
  pipe<A, B, C, D, E2, F, G, H, I>(op1: OperatorFunction<Result<T, E>, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E2>, op6: OperatorFunction<E2, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): {};
  pipe(...fns: any[]) {
    return pipe(...fns)(this)
  }

  map<A>(_f: (t: T) => A): Result<A, E> {
    return err(this.error)
  }

  mapErr<U>(f: (e: E) => U): Result<T, U> {
    return err(f(this.error))
  }

  andThen<U>(_f: (t: T) => Result<U, E>): Result<U, E> {
    return err(this.error)
  }

  async asyncMap<U>(_f: (t: T) => Promise<U>): Promise<Result<U, E>> {
    return err(this.error)
  }

  async asyncAndThen<U>(_f: (t: T) => Promise<Result<U, E>>): Promise<Result<U, E>> {
    return err(this.error)
  }

  match = <U, A>(
    _ok: (t: T) => U,
    err: (e: E) => A
  ): A => {
    return err(this.error)
  }

  async asyncMatch<U, A>(
    _ok: (t: T) => Promise<U>,
    err: (e: E) => Promise<A>
  ): Promise<A> {
    return err(this.error)
  }

  _unsafeUnwrap(): T {
    throw new Error('Called `_unsafeUnwrap` on an Err')
  }

  _unsafeUnwrapErr(): E {
    return this.error
  }
}
