/**
 * Generator functions generate values over time, and are exited and reentered
 * along the way.
 */
function *generateStuff() {
  yield 1
  yield 2
  let proceed = yield 3
  if (proceed) {
    yield 4
  }
  return 'done'
}

const generator = generateStuff()
console.log(generator.next().value) // 1
console.log(generator.next().value) // 2
console.log(generator.next().value) // 3

/**
 * There's a peek into the black box of the function here
 * that allows true to be passed in.
 */
console.log(generator.next(true).value) // 4
console.log(generator.next().value) // done

type PollingResults = {
  results: Result[],
  done: boolean
}

/**
 * Grab some search results from the backend.
 * @param term 
 * @returns 
 */
async function polling(term: string): Promise<PollingResults> {
  return fetch(`/pollingSearch?query=${term}`)
    .then(res => res.json())
}

function append(result: Result) {
  const node = document.createElement('li')
  node.innerHTML = `<a href="${result.url}">${result.title}</a>`
  document.querySelector('#results')?.append(node)
}

/**
 * Bonus asynchronous generator here. Generators return an iterator
 * as a way to loop through the values yielded. Each next() call results
 * in a possible value and status.
 * @param term
 */
async function *getResults(term: string): AsyncGenerator<Result[], void, boolean> {
  let state, stop
  do {
    state = await polling(term)
    stop = yield state.results // Supply results in batches until backend stops.
  } while (!state.done || stop)
}

document.getElementById('searchField')?.addEventListener('change', handleChange)

async function handleChange(this: HTMLElement, e: Event) {
  if (this instanceof HTMLInputElement) {
    let resultsGenerator = getResults(this.value) // Start up the generator.
    let next
    let count = 0
    do {
      next = await resultsGenerator.next(count >= 5) // Get the next results

      if (typeof next.value !== 'undefined') {
        next.value.map(append)
        count += next.value.length
      }
    } while (!next.done)
  }
}