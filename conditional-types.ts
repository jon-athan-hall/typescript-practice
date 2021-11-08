/**
 * Generics works like functions, have parameters, and return output!!!
 */
type Customer = {
  customerId: number,
  firstName: string,
  lastName: string
}

type Product = {
  productId: number,
  title: string,
  price: number
}

type Order = {
  orderId: number,
  customer: Customer,
  products: Product[],
  date: Date
}

const customer = {
  customerId: 1,
  firstName: 'Archie',
  lastName: 'Hall'
}

const product = {
  productId: 22,
  title: 'The Castles of Burgundy',
  price: 49
}

/**
 * It's possible to map input types to an output type, if
 * overload function definitions ever get out of hand.
 * 
 * The syntax is based on generics.
 * type Conditional<T> = T extends U ? A : B
 */
type FetchParams = number | Customer | Product

/**
 * Type constraint (extends) reduces available inputs to three.
 */
type FetchReturn<Param extends FetchParams> = 
  Param extends Customer ? Order[] : // if
  Param extends Product ? Order[] :  // else if
  Param extends number ? Order :     // else if
  never                              // else

type FetchByCustomer = FetchReturn<Customer>

type FetchByProductOrId = FetchReturn<Product | number>

// A few helper types to clean up the declarations.
type Callback<Res> = (result: Res) => void
type FetchCallback<T extends FetchParams> = Callback<FetchReturn<T>>
type AsyncResult<FHead, Par extends FetchParams> =
  FHead extends [Par, FetchCallback<Par>] ? void :
  FHead extends [Par] ? Promise<FetchReturn<Par>> :
  never

/*
 * Commonly, conditional types and overloaded functions are used together, such
 * as to both pass a callback or return a Promise if there is no callback.
 * function fetchOrder<Par extends FetchParams, FHead>(...args: FHead): AsyncResult<FHead, Par> {
 * }
 * function fetchOrder<Par extends FetchParams>(
 *   ...args: [Par]
 * ): Promise<FetchReturn<Par>>
 */

/**
 * In other cases, it's overkill and overloading functions with a little
 * conditional typing is better.
 */
function fetchOrder<Par extends FetchParams>(inp: Par): Promise<FetchReturn<Par>>
function fetchOrder<Par extends FetchParams>(inp: Par, fun: Callback<FetchReturn<Par>>): void
function fetchOrder<Par extends FetchParams>(inp: Par, fun?: Callback<FetchReturn<Par>>): Promise<FetchReturn<Par>> | void {
  const res =
    fetch(`/backend?inp=${JSON.stringify(inp)}`)
    .then(res => res.json())

  if (fun) {
    res.then(result => {
      fun(result)
    })
  } else {
    return res
  }
}
fetchOrder(customer) // Order[]
fetchOrder(product)  // Order[]
fetchOrder(2)        // Order