// jest.setup.js 또는 jest.polyfills.js
/* eslint-disable no-undef */

// Node.js 11+ 버전에서는 util 모듈에 TextEncoder/TextDecoder가 내장되어 있음.
import { TextEncoder, TextDecoder } from 'util';
// fetch API 폴리필 추가 (whatwg-fetch 사용)
// whatwg-fetch는 import될 때 자동으로 globalThis.fetch 등을 설정함
// 따라서 별도로 fetch, Headers, FormData 등을 import하여 globalThis에 할당할 필요가 없음
import 'whatwg-fetch'; // 이 한 줄로 fetch, Headers, Request, Response, FormData 등이 전역에 추가됨

Object.defineProperties(globalThis, {
    TextDecoder: { value: TextDecoder },
    TextEncoder: { value: TextEncoder },
});
