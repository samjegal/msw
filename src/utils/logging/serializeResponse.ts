import * as hp from 'headers-polyfill'
const { flattenHeadersObject, headersToObject } = hp
import type { SerializedResponse } from '../../setupWorker/glossary'

export function serializeResponse(source: Response): SerializedResponse<any> {
  return {
    status: source.status,
    statusText: source.statusText,
    headers: flattenHeadersObject(headersToObject(source.headers)),
    body: source.body,
  }
}
