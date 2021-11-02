type UserPreferences = {
  format: keyof VideoFormatURLs
  subtitles: {
    active: boolean,
    language: keyof SubtitleURLs
  },
  theme: 'dark' | 'light'
}

// Default values for the UserPreferences type.
const defaultUP: UserPreferences = {
  format: 'format1080p',
  subtitles: {
    active: false,
    language: 'english'
  },
  theme: 'light'
}

const myPreferences = {
  format: 'format720p'
}

/**
 * Dynamically created type that makes everything optional.
 * Look into Partial<Obj> and Required<Obj> too.
 * There's a readonly version that can be made, as well as a
 * recursive version to go down deeper levels in an object.
 */
type Optional<Obj> = {
  [Key in keyof Obj]?: Obj[Key]
}
type Const<Obj> = {
  readonly [Key in keyof Obj]: Obj[Key]
}
type DeepReadOnly<Obj> = {
  readonly [Key in keyof Obj]: DeepReadOnly<Obj[Key]>
}

/**
 * Override any parts of the default with actual user preferences.
 * Need an optional kind of type for the userPrefs parameter since there's
 * no telling what it'll hold.
 */
function combinePreferences(defaultUP: UserPreferences, userPrefs: Optional<UserPreferences>) {
  return { ...defaultUP, ...userPrefs }
}