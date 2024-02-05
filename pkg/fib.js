import * as wasm from "./fib_bg.wasm";
import { __wbg_set_wasm } from "./fib_bg.js";
__wbg_set_wasm(wasm);
export * from "./fib_bg.js";
