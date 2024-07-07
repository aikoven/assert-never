import { assertNever } from '.'
import * as ta from 'type-assertions'

describe('assertNever', () => {
  it('should throw error by default', () => {
    expect(() => assertNever('foo' as never)).toThrow('Unhandled discriminated union member: "foo"')
  })

  it('should return value when noError is true', () => {
    expect(assertNever('foo' as never, true)).toBe('foo')
  })

  it('should throw error when noError is false', () => {
    expect(() => assertNever('foo' as never, false)).toThrowError('Unhandled discriminated union member: "foo"')
  })

  it('should only accept a value of type never', () => {
    ta.assert<ta.Equal<Parameters<typeof assertNever>[0], never>>()
    ta.assert<ta.Not<ta.Equal<Parameters<typeof assertNever>[0], string>>>()

    // @ts-expect-error
    expect(() => assertNever('foo')).toThrow('Unhandled discriminated union member: "foo"')
  })

  it('should throw error with custom static error message', () => {
    expect(() => assertNever('foo' as never, 'Unexpected ')).toThrowError('Unexpected')
  })

  it('should throw error with dynamic static error message', () => {
    expect(() => assertNever('iou' as never, (value) => `Invalid payment type: ${String(value)}`)).toThrowError('Invalid payment type: iou')
  })
})
