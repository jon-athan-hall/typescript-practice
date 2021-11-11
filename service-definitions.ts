// List of method definitions.
const serviceDefinition = {
  open: { filename: String },
  insert: { pos: Number, text: String },
  delete: { pos: Number, len: Number },
  close: {}
}

function createService<
  S extends ServiceDefinition
>(
  serviceDef: S,
  handler: RequestHandler<S>
): ServiceObject<S> {
  const service: Record<string, Function> = {};

  for (const name in serviceDef) {
    service[name] =
      (payload: any) => handler({
        message: name,
        payload
      });
  }

  return service as ServiceObject<S>
}

/**
 * Has keys unknown and lots of method definitions.
 */
type ServiceDefinition = {
  [x: string]: MethodDefinition
}

/**
 * Payload for each method: a key unknown, and
 * either a number or string constructor.
 */
type MethodDefinition = {
  [x: string]: StringConstructor | NumberConstructor
}

type RequestHandler<
  T extends ServiceDefinition
> = (req: RequestObject<T>) => boolean

/**
 * RequestObject has each key of the service definition
 * becoming a message.
 */
type RequestObject<T extends ServiceDefinition> = {
  [P in keyof T]: {
    message: P,
    payload: RequestPayload<T[P]>
  }
}[keyof T]

/**
 * RequestPayload is defined by the object of each key in the
 * service definition.
 */
type RequestPayload<T extends MethodDefinition> =
  {} extends T ?
    undefined : // If an empty object, no payload.
    { [P in keyof T]: TypeFromConstructor<T[P]> }; // Otherwise key match, get type from constructor.

type TypeFromConstructor<T> =
  T extends StringConstructor ?
    string :
    T extends NumberConstructor ? number : any

// The ServiceObject, the return value of the createService function.
type ServiceObject<T extends ServiceDefinition> = {
  [P in keyof T]: ServiceMethod<T[P]>
}

type ServiceMethod<T extends MethodDefinition> =
  {} extends T ? () => boolean : // If empty object, no arguments.
  (payload: RequestPayload<T>) => boolean

