export declare type Result<T, E> = Ok<T, E> | Err<T, E>;
export declare const ok: <T, E>(value: T) => Ok<T, E>;
export declare const err: <T, E>(err: E) => Err<T, E>;
export declare class Ok<T, E> {
    private value;
    constructor(value: T);
    isOk(): this is Ok<T, E>;
    isErr(): this is Err<T, E>;
    map<A>(f: (t: T) => A): Result<A, E>;
    mapErr<U>(_f: (e: E) => U): Result<T, U>;
    andThen<U>(f: (t: T) => Result<U, E>): Result<U, E>;
    asyncMap<U>(f: (t: T) => Promise<U>): Promise<Result<U, E>>;
    asyncAndThen<U>(f: (t: T) => Promise<Result<U, E>>): Promise<Result<U, E>>;
    match: <U, A>(ok: (t: T) => U, _err: (e: E) => A) => U;
    asyncMatch<U, A>(ok: (t: T) => Promise<U>, _err: (e: E) => Promise<A>): Promise<U>;
    _unsafeUnwrap(): T;
    _unsafeUnwrapErr(): E;
}
export declare class Err<T, E> {
    private error;
    constructor(error: E);
    isOk(): this is Ok<T, E>;
    isErr(): this is Err<T, E>;
    map<A>(_f: (t: T) => A): Result<A, E>;
    mapErr<U>(f: (e: E) => U): Result<T, U>;
    andThen<U>(_f: (t: T) => Result<U, E>): Result<U, E>;
    asyncMap<U>(_f: (t: T) => Promise<U>): Promise<Result<U, E>>;
    asyncAndThen<U>(_f: (t: T) => Promise<Result<U, E>>): Promise<Result<U, E>>;
    match: <U, A>(_ok: (t: T) => U, err: (e: E) => A) => A;
    asyncMatch<U, A>(_ok: (t: T) => Promise<U>, err: (e: E) => Promise<A>): Promise<A>;
    _unsafeUnwrap(): T;
    _unsafeUnwrapErr(): E;
}
