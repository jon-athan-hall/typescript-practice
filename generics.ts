/**
 * Often times, helper functions do the exact same thing but for
 * different type definitions. Use generics in the case to generalize
 * the helper function. Types are specified later.
 * 
 * Formats is not a type, but a parameter to be substituted with a type.
 */
function isAvailable<Formats>(
  obj: Formats,
  key: string | number | symbol
): key is keyof Formats  { // Type predicate here, remember this?
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