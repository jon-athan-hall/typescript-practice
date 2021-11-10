/**
 * Class that serializes/deserializes JavaScript objects.
 */
class Serializer<T> {
  serialize(inp: T): string {
    return JSON.stringify(inp)
  }

  deserialize(inp: string): JSONified<T> {
    return JSON.parse(inp)
  }
}

type Widget = {
  toJSON(): {
    kind: 'Wdiget',
    date: Date
  }
}

type Item = {
  text: string,                // Okay
  count: number,               // Okay
  choice: 'yes' | 'no' | null, // Options preserved
  func: () => void,            // Functions dropped
  nested: {                    // Nested elements should work
    isSaved: boolean,
    data: [1, undefined, 2]
  },
  widget: Widget,              // Pointer to another object
  children?: Item[]            // Same object referenced again.
}

/**
 * With a few TypeScript lines of conditional types, the difference
 * between JSON and JavaScript objects can be defined.
 */
type JSONified<T> =
  JSONifiedValue<
    T extends { toJSON(): infer U } ? U : T
  >

/**
 * One type to cover all the JavaScript types and how they'll
 * convert to JSON.
 */
type JSONifiedValue<T> =
  T extends string | number | boolean | null ? T :
  T extends Function ? never :
  T extends object ? JSONifiedObject<T> :
  T extends Array<infer U> ? JSONifiedArray<U> :
  never

// Mapped type where JSONified is used again on all keys.
type JSONifiedObject<T> = {
  [P in keyof T]: JSONified<T[P]>
}

// Mapped type for converting Arrays.
type UndefinedAsNull<T> = T extends undefined ? null : T
type JSONifiedArray<T> =
  Array<UndefinedAsNull<JSONified<T>>>