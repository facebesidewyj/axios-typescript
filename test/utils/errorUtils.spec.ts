import { createError } from './../../src/entities'
import { AxiosRequestConfig, AxiosResponse } from '../../src/interfaces'

describe('error:utils', () => {
  test('should create an Error with message, config, code, request, response and isAxiosError', () => {
    const request = new XMLHttpRequest()

    const config: AxiosRequestConfig = { method: 'post' }

    const response: AxiosResponse = {
      status: 200,
      data: { foo: 'bar' },
      statusText: 'ok',
      headers: null,
      requestConfig: config,
      request: request
    }

    const error = createError({
      message: 'test',
      requestConfig: config,
      code: 'test',
      request,
      response
    })

    expect(error instanceof Error).toBeTruthy()
    expect(error.message).toBe('test')
    expect(error.requestConfig).toBe(config)
    expect(error.code).toBe('test')
    expect(error.request).toBe(request)
    expect(error.response).toBe(response)
  })
})
