import {describe, expect, it} from '@jest/globals';
import { validateShema } from "../src/utils/shipmentValidator";

describe('validator tests', () => {
  it('should validate simple number in object', () => {
    const schema = {
      id: {
        type: 'number'
      }
    }
    const obj = {
      id: 10
    }
    const res = validateShema(obj as any, schema as any)
    expect(res).toBeTruthy()
  })
  it('should validate number or string minLength', () => {
    const schema = {
      id: {
        type: 'number',
        minLength: 4
      },
      name: {
        type: 'string',
        minLength: 10
      }
    }
    const obj = {
      id: 1022,
      name: '1234567890'
    }

    const obj2 = {
      id: 102,
      name: '1234567890'
    }

    const obj3 = {
      id: 1022,
      name: '123456789'
    }
    const res = validateShema(obj as any, schema as any)
    const res2 = validateShema(obj2 as any, schema as any)
    const res3 = validateShema(obj3 as any, schema as any)
    expect(res).toBeTruthy()
    expect(res2).toBeFalsy()
    expect(res3).toBeFalsy()
  })
})
