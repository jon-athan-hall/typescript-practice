/**
 * New object with selected property keys K of object O.
 * [P in K] runs over all value types in union K, which is all keys of O.
 */
type P<O, K extends keyof O> = {
  [P in K]: O[P] // Indexed access type, like indexing an object, but getting a key back.
}

type HD = Pick<VideoFormatURLs, 'format1080p' | 'format720p'>
type sameAsHD = {
  format1080p: URL,
  format720p: URL
}

/**
 * Object type where all types in T get the type K, much like a dictionary.
 */
type R<K extends string | number | symbol, T> = {
  [P in K]: T
}

type URLDictionary = Record<string, URL>
type sameAsURLDictionary = {
  [k: string]: URL
}

type Format360 = {
  format360p: URL
}
type Format480 = {
  format480p: URL
}
type Format720 = {
  format720p: URL
}
type Format1080 = {
  format1080p: URL
}

type AvailableFormats = Format360 | Format480 | Format720 | Format1080

// Type contracts are fulfilled with the examples.
const hq: AvailableFormats = {
  format720p: new URL('...'),
  format1080p: new URL('...')
}
const lofi: AvailableFormats = {
  format360p: new URL('...'),
  format480p: new URL('...')
}

// Create a union of all keys of VideoFormatURLs.
type Split = keyof VideoFormatURLs

/**
 * Mapped type runs over all keys and creates a new object with those keys.
 * Hover over for details.
 */
type betterSplit = {
  [P in keyof VideoFormatURLs]: P
}

// Makes a union of the types from the keys. Hover over for details.
type evenBetterSplit = {
  [P in keyof VideoFormatURLs]: P
}[keyof VideoFormatURLs]

// Finally, a union of objects with keys and corresponding types.
type finalSplit = {
  [P in keyof VideoFormatURLs]: Record<P, VideoFormatURLs[P]>
}[keyof VideoFormatURLs]

// Same as above but made with generics.
type genericFinalSplit<Obj> = {
  [Prop in keyof Obj]: Record<Prop, Obj[Prop]>
}[keyof Obj]

type MoreAvailableFormats = genericFinalSplit<VideoFormatURLs>