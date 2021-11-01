type VideoFormatURLs = {
  format360p: URL,
  format480p: URL,
  format720p: URL,
  format1080p: URL
}

type SubtitleURLs = {
  english: URL,
  german: URL,
  french: URL
}

// Index types from all keys.
type URLObject = {
  [k: string]: URL
}

type Loaded<Key> = {
  format: Key,
  loaded: boolean
}

/**
 * Often times, helper functions do the exact same thing but for
 * different type definitions. Use generics in the case to generalize
 * the helper function. Types are specified later.
 * 
 * Formats is not a type, but a parameter to be substituted with a type.
 * 
 * The generic can be specified slightly with the extend keyword.
 */
function isAvailable<FormatList extends object>(
  obj: FormatList,
  key: string | number | symbol
): key is keyof FormatList  { // Type predicate here, remember this?
  return key in obj
}

// Explicitly use the type intended in the function call.
if (isAvailable<VideoFormatURLs>(videos, format)) {

}

declare const videoFormats: VideoFormatURLs

// Let TypeScript infer which the type from the parameters.
if (isAvailable(videoFormats, format)) {

}

// Returns a Promise<number> generic type.
async function randomNumber() {
  return Math.random()
}

// Same type declaration.
let oneArray: number[]
let twoArray: Array<number>

let mixedArray: Array<number | string | boolean>

/**
 * Generic references an index type for specificity.
 */
async function loadFile<
  Formats extends URLObject,
  Key extends keyof Formats
>(
  fileFormats: Formats,
  format: Key
): Promise<Loaded<Key>>  {
  const data = await fetch(fileFormats[format].href)
  return {
    format,
    loaded: data.response === 200
  }
}

const newResult = await loadFile(videos, 'format1080p')