export declare type Result<T, E> = Ok<T, E> | Err<T, E>;
export declare const ok: <T, E>(value: T) => Ok<T, E>;
export declare const err: <T, E>(err: E) => Err<T, E>;
export declare class Ok<T, E> {
    private value;
    constructor(value: T);
    isOk(): this is Ok<T, E>;
    isErr(): this is Err<T, E>;
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
    map<A>(f: (t: T) => A): Result<A, E>;
    mapErr<U>(_f: (e: E) => U): Result<T, U>;
    andThen<U>(f: (t: T) => Result<U, E>): Result<U, E>;
    asyncMap<U>(f: (t: T) => Promise<U>): Promise<Result<U, E>>;
    asyncAndThen<U>(f: (t: T) => Promise<Result<U, E>>): Promise<Result<U, E>>;
    match<U, A>(ok: (t: T) => U, _err: (e: E) => A): U;
    asyncMatch<U, A>(ok: (t: T) => Promise<U>, _err: (e: E) => Promise<A>): Promise<U>;
    _unsafeUnwrap(): T;
    _unsafeUnwrapErr(): E;
}
interface UnaryFunction<T, R> {
    (source: T): R;
}
interface OperatorFunction<T, R> extends UnaryFunction<T, R> {
}
export declare class Err<T, E> {
    private error;
    constructor(error: E);
    isOk(): this is Ok<T, E>;
    isErr(): this is Err<T, E>;
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
    map<A>(_f: (t: T) => A): Result<A, E>;
    mapErr<U>(f: (e: E) => U): Result<T, U>;
    andThen<U>(_f: (t: T) => Result<U, E>): Result<U, E>;
    asyncMap<U>(_f: (t: T) => Promise<U>): Promise<Result<U, E>>;
    asyncAndThen<U>(_f: (t: T) => Promise<Result<U, E>>): Promise<Result<U, E>>;
    match<U, A>(_ok: (t: T) => U, err: (e: E) => A): A;
    asyncMatch<U, A>(_ok: (t: T) => Promise<U>, err: (e: E) => Promise<A>): Promise<A>;
    _unsafeUnwrap(): T;
    _unsafeUnwrapErr(): E;
}
export {};
