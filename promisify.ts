/**
 * Takes any other callback-based function and creates
 * a promise-style function out of it.
 */
function promisify<
  Func extends FunctionWithCallback
>(func: Func): PromiseFunction<Func> {
  return function(...args: InferArguments<Func>) {
    return new Promise((resolve) => {
      function callback(result: InferResults<Func>) {
        resolve(result)
      }
      args.push(callback)
      func.call(null, ...args)
    })
  }
}

/**
 * Tuple is an array with the length defined,
 * and the type of each element known.
 * 
 * Variadic tuple type is a tuple but the exact
 * shape is not known.
 * 
 * That is hard to read at first but the type is
 * a function, with tuple argument as its parameters, 
 * which can be any size of a tuple T, with a function
 * as the last paramter. That function takes any arguments
 * and return anything. And the original function itself
 * then returns anything.
 */
type FunctionWithCallback<T extends any[] = any[]> =
  (...t: [...T, (...args: any) => any]) => any

/**
 * Now onto the return type, which is a function
 * with all arguments, except for the callback parameter.
 */
type PromiseFunction<T> =
  (...args: InferArguments<T>) => Promise<InferResults<T>>

/**
 * Infer the whole list of arguments and return them all.
 */
type InferArguments<T> =
  T extends (
    ...t: [...infer R, (...args: any) => any]
  ) => any ? R : never


type InferResults<T> = 
  T extends (
    ...t: [...infer T, (res: infer R) => any]
  ) => any ? R : never

/**
 * Example of usage of the new promisify function.
 */
declare function loadFile(
  fileName: string,
  callback: (result: string) => void
)

const loadFilePromise = promisify(loadFile)

loadFilePromise('./games.md')
  .then(result => result.toUpperCase())