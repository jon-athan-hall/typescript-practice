type Result = {
  title: string,
  url: string,
  abstract: string
}

/**
 * Use the declare keyword to type a function head, before
 * the actual implementation to think about the function's
 * interface before any details.
 * 
 * The tags parameter is optional.
 * @param query
 * @param tags 
 */
function search(query: string, tags?: string[]): Promise<Result[]> {
  let queryString = `?query=${query}`

  if (tags?.length) {
    queryString += `&tags=${tags.join()}`
  }

  /**
   * Hover over functions to learn their parameters and return values.
   * Explicitly type the function head's return value to match
   * with what response.json() returns.
   */
  return fetch(`/search${queryString}`)
    .then(response => response.json())
}

/**
 * Hover over this SearchFunction to see the expanded type definition
 * for the function.
 */
type SearchFunction = typeof search

/**
 * Functions can be typed within Objects. Or the function
 * can be typed as its own separate type, then used later
 * in the Object type definition.
 */
type Query = {
  query: string,
  tags?: string[],
  assemble: (includeTags: boolean) => string
}

/**
 * An example Query object that satisfies the previously defined
 * type definition.
 */
const query: Query = {
  query: 'Ember',
  tags: ['javascript'],
  assemble(includeTags = false) {
    let query = `?query=${this.query}`

    if (includeTags && typeof this.tags !== 'undefined') {
      query += `&${this.tags.join('.')}`
    }

    return query
  }
}

/**
 * This function type declaration has a callback function
 * as one of its parameters. That callback function references
 * the previously defined type called SearchFunction.
 * @param inputId
 * @param outputId 
 * @param search 
 */
function displaySearch(inputId: string, outputId: string, search: SearchFunction): void {
  /**
   * The this keyword value from getElementById will be passed into the callback.
   */
  document.getElementById(inputId)?.addEventListener('change', inputChangeHandler)
}

/**
 * TypeScript allows for using this as a parameter to type when breaking out callback
 * functions for easier reuse.
 */
function inputChangeHandler(this: HTMLElement) {
  this.parentElement?.classList.add('active')

  /**
   * Guard check the this keyword referenced after the getElementById call. By default
   * TypeScript is assuming this is an HTMLElement, which doesn't have value as a property.
   */
  if (this instanceof HTMLInputElement) {
    const searchTerm = this.value
    search(searchTerm)
      .then(results => {
        // @TODO
      })
  }
}

/**
 * Function type declarations require the order of parameters and
 * their types, but the actual names of the parameters can be different!
 * 
 * Parameters, even non-optional ones, can be dropped completely too.
 * 
 * Any return type can be used when a function's typed return is void.
 * Have the callback function type definition explicityly return undefined
 * in order to require the callback function parameter to return only undefined.
 */