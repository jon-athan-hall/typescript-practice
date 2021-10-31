/**
 * Function overloading in possible by writing type definitions for different
 * use cases, but still with only one implementation of the function.
 */
function overloadedSearch(
  term: string,
  tags?: string[]
): Promise<Result[]>
function overloadedSearch(
  term: string,
  callback: (results: Result[]) => void,
  tags?: string[]
): void
function overloadedSearch(
  term: string,
  p2?: string[] | ((results: Result[]) => void), // Union type better than unknown.
  p3?: string[]
) {
  // Set the callback only if p2 is a function.
  const callback = typeof p2 === 'function' ? p2 : undefined

  // Set the tags if either p2 or p3 is defined and an array.
  const tags =
    typeof p2 !== 'undefined' && Array.isArray(p2) ? p2 :
    typeof p3 !== 'undefined' && Array.isArray(p3) ? p3 :
    undefined;

  let queryString = `?query=${term}`

  if (tags && tags.length) {
    queryString += `&tags=${tags.joing()}`
  }

  const results = fetch(`/search${queryString}`)
    .then(response => response.json())
  
  // Callback could be undefined.
  if (callback) {
    // Basically return void.
    return void results.then(res => callback(res))
  } else {
    // Return the Promise if there was no callback.
    return results
  }
}

/**
 * Overloading can be done in function type aliases to
 * set the contract for a single type.
 */
type SearchOverloadFunction = {
  (
    term: string,
    tags?: string[] | undefined
  ): Promise<Result[]>
  (
    term: string,
    callback: (results: Result[]) => void,
    tags?: string[] | undefined
  ): void
}

const searchWithOverloads: SearchOverloadFunction =
  (
    term: string,
    p2?: string[] | ((results: Result[]) => void),
    p3?: string[]
  ) => {
    // Implementation here.
  }