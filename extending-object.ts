/**
 * Two generics, one to make sure this method only uses objects
 * and the other makes sure the key is either string | number | symbol
 * with the built-in PropertyKey type.
 */
function hasOwnProperty<
  X extends {}, Y extends PropertyKey
>(
  obj: X, prop: Y
): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

/**
 * Assertion signatures make sure some value is a certain type,
 * and throws an error if it isn't.
 */
function assertIsNum(val: any): asserts val is number {
  if (typeof val !== 'number') {
    throw new AssertionError('Not a number!')
  }
}

function multiply(x, y) {
  assertIsNum(x)
  assertIsNum(y)

  // TypeScript knows x and y are numbers.
  return x * y
}

function defineProperty<
  Obj extends object,
  Key extends PropertyKey,
  PDesc extends PropertyDescriptor>
  (obj: Obj, prop: Key, val: PDesc):
    asserts obj is Obj & DefineProperty<Key, PDesc> {
    Object.defineProperty(obj, prop, val)
  }

  type DefineProperty<
    Prop extends PropertyKey,
    Desc extends PropertyDescriptor> =
      Desc extends {
        writable: any, set(val: any): any
      } ? never :
      Desc extends {
        writable: any, get(): any
      } ? never :
      Desc extends {
        writable: false
      } ? Readonly<InferValue<Prop, Desc>> :
      Desc extends {
        writable: true
      } ? InferValue<Prop, Desc> :
        Readonly<InferValue<Prop, Desc>>

type InferValue<Prop extends PropertyKey, Desc> =
 Desc extends { get(): any, value: any } ? never :
 Desc extends { value: infer T } ? Record<Prop, T> :
 Desc extends { get(): infer T } ? Record<Prop, T> :
 never;

interface ObjectConstructor {
  defineProperty<
    Obj extends object,
    Key extends PropertyKey,
    PDesc extends PropertyDescriptor
  >(obj: Obj, prop: Key, val: PDesc):
    asserts obj is Obj & DefineProperty<Key, PDesc>
}