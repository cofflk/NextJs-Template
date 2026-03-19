// https://redux-toolkit.js.org/api/createListenerMiddleware

const createListenerMiddleware = (options?: CreateMiddlewareOptions) =>
    ListenerMiddlewareInstance
  
  interface CreateListenerMiddlewareOptions<ExtraArgument = unknown> {
    extra?: ExtraArgument
    onError?: ListenerErrorHandler
  }
  
  type ListenerErrorHandler = (
    error: unknown,
    errorInfo: ListenerErrorInfo,
  ) => void
  
  interface ListenerErrorInfo {
    raisedBy: 'effect' | 'predicate'
  }