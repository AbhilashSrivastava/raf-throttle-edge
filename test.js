import test from 'ava'
import { spy } from 'sinon'
import raf from 'raf'
import throttle from './rafThrottle.js'

raf.polyfill();

/*
 Test Leading Edge throttles
*/
test.cb('throttle', t => {
  t.plan(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    t.is(callbackSpy.callCount, 1)
    t.end()
  })
})

test.cb('call the callback with arguments', t => {
  t.plan(1)

  const callbackSpy = spy()
  const args = ['foo', 'bar']

  const throttled = throttle(callbackSpy)
  throttled(...args)

  raf(() => {
    t.deepEqual(callbackSpy.args[0], args)
    t.end()
  })
})

test.cb('more throttles', t => {
  t.plan(1)

  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled()

  raf(() => {
    throttled()
    throttled()

    raf(() => {
      t.is(callbackSpy.callCount, 2)
      t.end()
    })
  })
})

test.cb(' Cancel the trailing throttled invocation', t => {
  const callbackSpy = spy()

  const throttled = throttle(callbackSpy)
  throttled()
  throttled.cancel()

  raf(() => {
    t.is(callbackSpy.callCount, 0)
    t.end()
  })
})

/*
 Test Trailing Edge throttles
 */
test.cb('throttle', t => {
  t.plan(1)

const callbackSpy = spy()

const throttled = throttle(callbackSpy, true)
throttled()
throttled()

raf(() => {
  t.is(callbackSpy.callCount, 1)
t.end()
})
})

test.cb('call the callback with arguments', t => {
  t.plan(1)

const callbackSpy = spy()
const args = ['foo', 'bar']

const throttled = throttle(callbackSpy, true)
throttled(...args)

raf(() => {
  t.deepEqual(callbackSpy.args[0], args)
t.end()
})
})

test.cb('more throttles', t => {
  t.plan(1)

const callbackSpy = spy()

const throttled = throttle(callbackSpy, true)
throttled()
throttled()

raf(() => {
  throttled()
  throttled()

  raf(() => {
  t.is(callbackSpy.callCount, 2)
  t.end()
})
})
})

test.cb(' Cancel the trailing throttled invocation', t => {
  const callbackSpy = spy()

  const throttled = throttle(callbackSpy, true)
  throttled()
  throttled.cancel()

raf(() => {
  t.is(callbackSpy.callCount, 0)
t.end()
})
})



/*
* Manual Test the throttles and the way they work
* Uncomment this code and paste this "console.log('args', args)" in line number 19 in rafThrottle.js
* See the test console to see the respective outputs
 */

//
// test.only.cb('leading edge throttle output', t => {
//   console.log('Leading Edge throttle manual test')
//   const f = (params) => {
//      console.log('running args -> ' + params)
//   }
//   const throttled = throttle(f)
//   let x = 0.5
//   setInterval(() => {
//     x += 0.5
//     throttled(x)
//   }, 0.5)

// })
//
// test.only.cb('trailing edge throttle output', t => {
//   console.log('Trailing Edge throttle manual test')
//   const f = (params) => {
//   console.log('running args -> ' + params)
// }
// const throttled = throttle(f, true)
// let x = 1
// setInterval(() => {
//   x++;
// throttled(x)
// }, 0.5)
// })
