type Talk = {
  title: string,
  abstract: string,
  speaker: string
}

/**
 * Combo of union type and value type. Ensures only particular values can be used.
 * Pretty much as specific as it gets. Reminiscent of enum.
 */
// type EventKind = 'webinar' | 'conference' | 'meetup'

type TechEventBase = {
  title: string,
  description: string,
  date: Date,
  capacity: number,
  rsvp: number
}

/**
 * Intersection types are useful for common properties.
 */
type Conference = TechEventBase & {
  location: string,
  price: number,
  talks: Talk[],
  kind: 'conference'
}

type Meetup = TechEventBase & {
  location: string,
  price: string,
  talks: Talk[],
  kind: 'meetup'
}

type Webinar = TechEventBase & {
  url: string,
  price?: number,
  talks: Talk,
  kind: 'webinar'
}

/**
 * New event type thrown in later!
 */
type Hackathon = TechEventBase & {
  location: string,
  price?: number,
  kind: 'hackathon'
}

/**
 * Union types are useful when something will be one
 * of many possible types.
 */
type TechEvent = Webinar | Conference | Meetup | Hackathon

/**
 * After adding Hackathon to TechEvent, the EventType type union
 * will adapt if defined like so.
 */
type EventKind = TechEvent['kind']

/**
 * Possible usage focused on the different forms of price and talks.
 * Notice all the type guards in place.
 */
function printEvent(event: TechEvent) {
  if (event.price) {
    if (typeof event.price === 'number') {
      console.log('Price: ', event.price) // Price exists and is a number.
    } else {
      console.log('Free!') // Price exists and is a string.
    }
  }

  if (Array.isArray(event.talks)) {
    event.talks.forEach(talk => {
      console.log(talk.title) // The talks property is an Array of Talks.
    })
  } else {
    console.log(event.talks.title) // The talks property is a single Talk.
  }
}

/**
 * Value types get even more specific than top types and primitive types.
 */
let withTypeAny: any = 'conference' // Okay to do.
let withTypeString: string = 'conference' // Okay to do.
let withValueType: 'conference' = 'conference' // Okay to do.

let conference = 'conference' // Type is string. It can change.
const conf = 'conference' // Type is 'conference'. It cannot change.

function getEventTeaser(event: TechEvent) {
  /**
   * With the value type in the lower-level type, TypeScript can
   * now expect what other properties are available.
   */
  switch(event.kind) {
    case 'conference':
      return `${event.title} (Conference), ` +
        `priced at ${event.price} USD`
    case 'meetup':
      return `${event.title} (Meetup), ` +
        `hosted at ${event.location}`
    case 'webinar':
      return `${event.title} (Webinar), ` +
        `available online at ${event.url}`
    case 'hackathon':
      return `${event.title} (Hackathon)`
    default:
      throw neverError('Not a kind of event.', event)
  }
}

/**
 * Error handler for any time a default case or else block is reached.
 * Bottom values: never, undefined, and null.
 * @param message
 * @param token 
 */
function neverError(message: string, token: never) {
  return new Error(`${message}. ${token} show not exist.`)
}

/**
 * A more generic data structure may still fit TechEvent,
 * but there's a little something extra needed for the
 * kind property.
 */
const scriptResponse = {
  title: 'HorrorCon',
  date: new Date('2021-10-31'),
  capacity: 500,
  rsvp: 444,
  description: 'Spooktacular event',
  kind: 'conference' as const, // Cast this a value type.
  price: 666,
  location: 'The Lost Hollows',
  talks: [{
    speaker: 'Freddy Krueger',
    title: 'How to scare people',
    abstract: '...'
  }]
}

/**
 * Easy to filter by value types.
 * @param list
 * @param kind 
 * @returns 
 */
function filterByKind(list: TechEvent[], kind: EventKind): TechEvent[] {
  return list.filter(entry => entry.kind === kind)
}

/**
 * Create a map of tech event based on event kind. These is called a
 * mapped type.
 */
type GroupedEvents = {
  [Kind in EventKind]: TechEvent[]
}

function groupEvents(events: TechEvent[]): GroupedEvents {
  const grouped = {
    conference: [],
    meetup: [],
    webinar: [],
    hackathon: []
  }

  events.forEach(ev => grouped[ev.kind].push(ev))

  return grouped
}

/**
 * Users can be subscribed to many Events in four different ways.
 */
type UserEvents = {
  watching: TechEvent[],
  rsvp: TechEvent[],
  attended: TechEvent[],
  out: TechEvent[]
}

/**
 * Users can filter their events by subscription category, then
 * further by event kind.
 */
type UserEventCategory = 'watching' | 'rsvp' | 'attended' | 'out'

function filterUserEvent(
  list: UserEvents,
  category: string,
  filterKind?: EventKind
) {
  if (isUserEventListCategory(list, category)) {
    const filteredList = list[category]

    if (filterKind) {
      return filteredList.filter(ev => ev.kind === filterKind)
    }

    return filteredList
  }
  return list
}

/**
 * Helper function to make sure the supplied category is actually in the list of keys.
 * @param list
 * @param category 
 * @returns 
 */
function isUserEventListCategory(
  list: UserEvents,
  category: string
): category is keyof UserEvents { // Use type predicates to guarantee types for boolean functions.
  return Object.keys(list).includes(category) // Alternately use keyof to get all keys in UserEvents.
}

/**
 * An exploration of null and undefined and optional chaining and null type checks.
 * Turn on strictNullChecks in tsconfig.json to have TypeScript exclude null from any
 * assumed types.
 */
function getTeaserHTML(event: TechEvent) {
  return `<h2${event.title}</h2>
    <p>
      ${event.description}
    </p>`
}

function getTeaserListElement(event: TechEvent) {
  const content = getTeaserHTML(event)
  const element = document.createElement('li')
  element.classList.add('teaser-card')
  element.innerHTML = content
  return element
}

function appendEventToList(event: TechEvent) {
  const list = document.querySelector('#event-list')
  const element = getTeaserListElement(event)
  list?.append(element) // This optional chaining syntax was automatically added!
}