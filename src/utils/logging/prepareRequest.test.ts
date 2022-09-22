import { encodeBuffer } from '@mswjs/interceptors'
import hp from 'headers-polyfill'
const { Headers } = hp
import { MockedRequest } from '../request/MockedRequest'
import { prepareRequest } from './prepareRequest'

test('converts request headers into an object', () => {
  const request = prepareRequest(
    new MockedRequest(new URL('http://test.mswjs.io/user'), {
      headers: new Headers({
        'Content-Type': 'text/plain',
        'X-Header': 'secret',
      }),
      body: encodeBuffer('text-body'),
    }),
  )

  expect(request).toEqual(
    expect.objectContaining({
      url: new URL('http://test.mswjs.io/user'),
      // Converts `Headers` instance into a plain object.
      headers: {
        'content-type': 'text/plain',
        'x-header': 'secret',
      },
      body: 'text-body',
    }),
  )
})
