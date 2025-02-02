import '@testing-library/jest-dom'
import fetch, { Request, Response, Headers } from 'node-fetch'

// Define o polyfill de fetch e suas dependências globalmente
globalThis.fetch = fetch as unknown as typeof globalThis.fetch
globalThis.Request = Request as unknown as typeof globalThis.Request
globalThis.Response = Response as unknown as typeof globalThis.Response
globalThis.Headers = Headers as unknown as typeof globalThis.Headers
