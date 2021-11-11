/**
 * JSX is strictly syntactical sugar. The method signature
 * of JSX is (element, properties, ...children)
 *
 * <Button onClick={() => alert('YES')}>Click me</button>
 * 
 * is really:
 * 
 * React.createElement(Button, { onClick: () => alert('YES') }, 'Click me')
 * 
 * TypeScript is a JSX compiler, and the JSX factory can be changed.
 * @param element - string or component
 * @param properties - object with keys or null
 * @param children - null or calls to the factory again
 */
function DOMCreateElement<
  T extends string
>(
  element: T,
  properties: Props<T>,
  ...children: PossibleChildren[]
): HTMLElement
function DOMCreateElement<
  F extends Func
>(
  element: F,
  properties: Props<F>,
  ...children: PossibleChildren[]
): HTMLElement
function DOMCreateElement(
  element: any,
  properties: any,
  ...children: PossibleChildren[]
): HTMLElement {
  // If it's a functional component, call it, expect Node type returned.
  if (typeof element === 'function') {
    return element({
      ...nonNull(properties, {}),
      children
    })
  }

  // Otherwise it's a string, so parse a regular node.
  return DOMParseNode(
    element,
    properties,
    children
  )
}

/**
 * Help function that ensures no null values.
 * The return type is inferred as T | U.
 */
function nonNull<T, U>(val: T, fallback: U) {
  return Boolean(val) ? val : fallback
}

// Looser interpretation of Function, to infer parameters.
type Func = (...args: any[]) => any

/**
 * Use an special interface in TypeScript for getting
 * the type according to HTML tag. CreateElement returns
 * the element according to the string T passed in.
 */
type AllElementKeys = keyof HTMLElementTagNameMap
type CreatedElement<T> =
  T extends AllElementKeys ? HTMLElementTagNameMap[T] : HTMLElement

/**
 * If a function is passed into Props, get all its parameters.
 * If a string, then the properties correspond to the HTML element properties.
 */
type Props<T> =
  T extends Func ? Parameters<T>[0] :
  T extends string ? Partial<CreatedElement<T>> :
  never

/**
 * Create an element and apply all properties.
 * Append children if necessary.
 * @param element 
 * @param properties 
 * @param children 
 * @returns 
 */
function DOMParseNode<
  T extends String
>(
  element: T,
  properties: Props<T>,
  children: PossibleChildren[]
) {
  const el = Object.assign(
    document.createElement(element),
    properties
  )

  DOMParseChildren(children).forEach(child => {
    el.appendChild(child)
  })

  return el
}

// Helper union type.
type PossibleChildren = HTMLElement | Text | string

/**
 * Quick mapping function to convert string children into
 * text nodes, and keep the rest as regular nodes.
 * Return type is either HTMLElement or Text, since any
 * string is converted to a Text.
 * @param children
 * @returns 
 */
function DOMParseChildren(children: PossibleChildren[]) {
  return children.map(child => {
    if (typeof child === 'string') {
      return document.createTextNode(child)
    }
    return child
  })
}

/**
 * Namespaces, like interfaces, allow for declaration merging.
 * This creates autocompletion for HTML elements and function components.
 */
declare namespace JSX {
  // The helper, mapped type.
  type OurIntrinsicElements = {
    [P in keyof HTMLElementTagNameMap]: Partial<HTMLElementTagNameMap[P]>
  }

  // Keep it open for declaration merging.
  interface InstrinsicElements
    extends OurIntrinsicElements {}
  
  // JSX returns HTML elements. Keep this open for declaration merging.
  interface Element extends HTMLElement {}
}