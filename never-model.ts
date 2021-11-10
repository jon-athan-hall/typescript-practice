/**
 * Ultimate goal is to model data and behavior but never
 * maintain our types beyond the model.
 */
type Medium = {
  id: number,
  title: string,
  artist: string
}

type TrackInfo = {
  duration: number,
  tracks: number
}

// Add the kind to discriminate unions.
type CD = Medium & TrackInfo & {
  kind: 'cd'
}
type LP = Medium & {
  sides: {
    a: TrackInfo,
    b: TrackInfo
  },
  kind: 'lp'
}

type AllMedia = CD | LP
type MediaKinds = AllMedia['kind']

/**
 * Conditional type that checks if each union member is a subtype
 * of the kind we are filtering for.
 */
type SelectBranch<Branch, Kind> = 
  Branch extends { kind: Kind } ? Branch : never

type SelectCD = SelectBranch<AllMedia, 'cd'>

/**
 * Built-in helper type that extracts from A, those types that are
 * assignable to B.
 * 
 * type Extract<A, B> = A extends B ? A : never
 */
type SelectLP = Extract<AllMedia, { kind: 'lp' }>

/**
 * The keys of our objeccts that we do not need for the function.
 * And a distributive conditional type, similar to Extract, called Exclude.
 * If type A is part of B, remove it.
 */
type Removable = 'kind' | 'id'
type Remove<A, B> = A extends B ? never : A

type CDKeys = keyof CD
type CDInfoKeys = Remove<CDKeys, Removable>

/**
 * Create an object type with this new subset of keys.
 * Use Pick!... it runs over a set of keys and selects the type
 * from the original property type.
 * 
 * Long winded way instead of using Omit:
 * type CDInfo = Pick<
 *   CD,
 *   Exclude<keyof CD, 'kind' | 'id'>
 * >
 */
type CDInfo = Omit<CD, 'kind' | 'id'>

/**
 * Generalize this type for any possible incoming type.
 * CD or LP or anything else.
 */
type GetInfo<Med> = Omit<Med, Removable>

declare function createMedium<
  Kind extends MediaKinds
>(
  kind: Kind,
  info: GetInfo<SelectBranch<AllMedia, Kind>>
): SelectBranch<AllMedia, Kind>