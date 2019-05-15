"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
exports.__esModule = true;
exports.ok = function (value) { return new Ok(value); };
exports.err = function (err) { return new Err(err); };
function pipe() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    return pipeFromArray(fns, function (prev, fn) { return fn(prev); });
}
var noop = function () { };
function pipeFromArray(fns, transform) {
    if (!fns) {
        return noop;
    }
    // if (fns.length === 1) {
    //   return (input) => transform(input, fns[0]);
    // }
    return function piped(input) {
        // .then for Promise
        return fns.reduce(function (prev, fn) { return transform(prev, fn); }, input);
    };
}
var Ok = /** @class */ (function () {
    function Ok(value) {
        this.value = value;
    }
    Ok.prototype.isOk = function () {
        return true;
    };
    Ok.prototype.isErr = function () {
        return !this.isOk();
    };
    Ok.prototype.pipe = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return pipe.apply(void 0, __spread(fns))(this);
    };
    Ok.prototype.map = function (f) {
        return exports.ok(f(this.value));
    };
    Ok.prototype.mapErr = function (_f) {
        return exports.ok(this.value);
    };
    // add info on how this is really useful for converting a
    // Result<Result<T, E2>, E1>
    // into a Result<T, E2>
    Ok.prototype.andThen = function (f) {
        return f(this.value);
    };
    Ok.prototype.asyncMap = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            var newInner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, f(this.value)];
                    case 1:
                        newInner = _a.sent();
                        return [2 /*return*/, exports.ok(newInner)];
                }
            });
        });
    };
    Ok.prototype.asyncAndThen = function (f) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, f(this.value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // talk about match can be used to unwrap values in a typesafe way
    Ok.prototype.match = function (ok, _err) {
        return ok(this.value);
    };
    Ok.prototype.asyncMatch = function (ok, _err) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ok(this.value)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // talk about how unwrapping defeats the purpose of Results
    Ok.prototype._unsafeUnwrap = function () {
        return this.value;
    };
    Ok.prototype._unsafeUnwrapErr = function () {
        throw new Error('Called `_unsafeUnwrapErr` on an Ok');
    };
    return Ok;
}());
exports.Ok = Ok;
var Err = /** @class */ (function () {
    function Err(error) {
        this.error = error;
    }
    Err.prototype.isOk = function () {
        return false;
    };
    Err.prototype.isErr = function () {
        return !this.isOk();
    };
    Err.prototype.pipe = function () {
        var fns = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            fns[_i] = arguments[_i];
        }
        return pipe.apply(void 0, __spread(fns))(this);
    };
    Err.prototype.map = function (_f) {
        return exports.err(this.error);
    };
    Err.prototype.mapErr = function (f) {
        return exports.err(f(this.error));
    };
    Err.prototype.andThen = function (_f) {
        return exports.err(this.error);
    };
    Err.prototype.asyncMap = function (_f) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exports.err(this.error)];
            });
        });
    };
    Err.prototype.asyncAndThen = function (_f) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, exports.err(this.error)];
            });
        });
    };
    Err.prototype.match = function (_ok, err) {
        return err(this.error);
    };
    Err.prototype.asyncMatch = function (_ok, err) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, err(this.error)];
            });
        });
    };
    Err.prototype._unsafeUnwrap = function () {
        throw new Error('Called `_unsafeUnwrap` on an Err');
    };
    Err.prototype._unsafeUnwrapErr = function () {
        return this.error;
    };
    return Err;
}());
exports.Err = Err;
