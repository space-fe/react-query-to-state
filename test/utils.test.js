import { validateObject } from '../src/utils/validate'
import { filterObjWithDefaultObj } from '../src/utils/objectUtil'
import cases from 'jest-in-case'

cases('test utils validateObject', opts => {
  const { obj, defaultObj, validator, expectedResult } = opts
  expect(validateObject(obj, defaultObj, validator)).toEqual(expectedResult)
}, [
  {
    name: 'Validator type=range, and has no matched value',
    obj: { tab: 'TAB1' },
    defaultObj: { tab: 'TAB2' },
    validator: {
      tab: [{ type: 'range', value: ['TAB2', 'TAB3'] }]
    },
    expectedResult: { tab: 'TAB2' }
  },
  {
    name: 'Validator type=range, and has matched value',
    obj: { tab: 'TAB1' },
    defaultObj: { tab: 'TAB2' },
    validator: {
      tab: [{ type: 'range', value: ['TAB1', 'TAB2'] }]
    },
    expectedResult: { tab: 'TAB1' }
  },
  {
    name: 'Validator type=regexp, and has no matched value',
    obj: { tab: '123' },
    defaultObj: { tab: 'TAB1' },
    validator: {
      tab: [{ type: 'regexp', value: /^TAB/i }]
    },
    expectedResult: { tab: 'TAB1' }
  },
  {
    name: 'Validator type=function, and has no matched value',
    obj: { tab: '123' },
    defaultObj: { tab: 'TAB1' },
    validator: {
      tab: [
        {
          type: 'function',
          value: (value) => {
            return value.startsWith('TAB')
          }
        }
      ]
    },
    expectedResult: { tab: 'TAB1' }
  },
  {
    name: 'Has multi validator type and no matched value',
    obj: { tab: 'TAB-HA' },
    defaultObj: { tab: 'TAB1' },
    validator: {
      tab: [
        {
          type: 'range',
          value: ['TAB1', 'TAB2', 'TAB3']
        },
        {
          type: 'function',
          value: (value) => {
            return value.startsWith('TAB')
          }
        }
      ]
    },
    expectedResult: { tab: 'TAB1' }
  },
  {
    name: 'Has invalid validator type',
    obj: { tab: 'TAB2' },
    defaultObj: { tab: 'TAB1' },
    validator: {
      tab: [
        {
          type: 'range',
          value: ['TAB1', 'TAB2', 'TAB3']
        },
        {
          type: 'test',
          value: 123
        }
      ]
    },
    expectedResult: { tab: 'TAB1' }
  }
])

cases('test utils filterObjWithDefaultObj', opts => {
  const { obj, defaultObj, expectedResult } = opts
  expect(filterObjWithDefaultObj(obj, defaultObj)).toEqual(expectedResult)
}, [
  {
    name: 'When object key value is a string',
    obj: {
      key1: 'obj-key1',
      key2: 'obj-key2'
    },
    defaultObj: {
      key1: 'defaultObj-key1'
    },
    expectedResult: {
      key1: 'obj-key1'
    }
  },
  {
    name: 'When object key value is a bool string',
    obj: {
      key1: 'true',
      key2: 'false'
    },
    defaultObj: {
      key1: 'defaultObj-key1',
      key2: 'defaultObj-key2'
    },
    expectedResult: {
      key1: true,
      key2: false
    }
  }
])
