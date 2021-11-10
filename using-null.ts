/**
 * The fetch method returns a Promise<any> which includes
 * undefined and null as well.
 */
declare function fetcOrderhList(
  input: Customer | Product
): Promise<Order[] | null>

/**
 * Null checks have to be done inside this function.
 * or make sure null can never be passed in.
 */
declare function listOrders(Order[] | null): void
declare function listOrders(Order[]): void

/**
 * Either way a generic helper function is needed, to
 * ensure no nullish values come up. NonNullable is a 
 * built-in utility distribute conditional type.
 */
declare function isAvailable<Obj>(obj: Obj): obj is NonNullable<Obj>

type NonNullableExample<T> = T extends null | undefined ? never : T