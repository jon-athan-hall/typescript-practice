// Helper type that creates a union of undefined and whatever else.
type Nullable<G> = G | undefined

// Generic default parameter in class definition will use HTMLVideoElement.
class Container<GElement extends HTMLElement = HTMLVideoElement> {
  #element: Nullable<GElement>
  #prefs: UserPreferences

  constructor(prefs: UserPreferences) {
    this.#prefs = prefs
  }

  set element(value: Nullable<GElement>) {
    this.#element = value
  }

  get element(): Nullable<GElement> {
    return this.#element
  }

  /**
   * Load the video inside of a video element. If element
   * isn't an HTMLVideoElement, create on and append it to element.
   */
  loadVideo(formats: VideoFormatURLs) {
    const selectedFormat = formats[this.#prefs.format].href

    if (this.#element.instanceof HTMLVideoElement) {
      this.#element.src = selectedFormat
    } else {
      const vid = document.createElement('video')
      this.#element?.appendChild(vid)
      vid.src = selectedFormat
    }
  }
}

const container = new Container(userPrefs)
container.element = document.createElement('video')
container.loadVideo(videos)
