function createUser(
  name: string,
  role: 'admin' | 'maintenance' | 'shipping',
  isActive: boolean
) {
  return {
    userId: userId++,
    name,
    role,
    isActive,
    createdAt: new Date()
  }
}

/**
 * The variable's type takes on the shape of what's
 * returned by the function.
 */
const user = createUser('Archie', 'intern', true)
type ReturnedUser = typeof user

/**
 * Generic type that takes any function with any parameters.
 * 
 * Able to infer types that are in this extends clause. No matter the
 * return type of R, if the function is valid, return R as type.
 */
type GetReturn<Func> = Func extends (...args: any[]) => infer R ? R : never
type User = GetReturn<typeof createUser>

/**
 * Example for the resolved value of Promise.
 */
type Unpack<T> = T extends Promise<infer Res> ? Res : never
type A = Unpack<Promise<number>>

/**
 * Example that flattens an array for the array's values.
 */
type Flatten<T> = T extends Array<infer Vals> ? Vals : never
type B = Flatten<Customer[]>

/**
 * Look for more built-in conditional types such as: Parameters,
 * InstanceType, ThisParameterType, OmitThisParameterType, etc.
 */