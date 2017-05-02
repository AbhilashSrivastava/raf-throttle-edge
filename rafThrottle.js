const rafThrottle = (callback, trailing = false) => {
  let requestId, savedArgs = null
  const then = newArgs => () => {
    requestId = null
    if (!trailing) {
      callback(...newArgs)
      return
    }
    if (savedArgs === null) {
      callback(...newArgs)
      return
    }
    callback(savedArgs)
  }

  const throttled = (...args) => {
    if (trailing) savedArgs = args
    // For manual testing purposes
    // trailing ?  console.log(savedArgs) : console.log(args)
    if ((requestId === null) || (requestId === undefined)) {
      requestId = requestAnimationFrame(then(args))
      if (trailing) savedArgs = null
    }
  }

  throttled.cancel = () =>
    cancelAnimationFrame(requestId)

  return throttled
}

export default rafThrottle