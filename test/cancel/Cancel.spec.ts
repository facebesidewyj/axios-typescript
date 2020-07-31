import { Cancel, isCancel } from '../../src/entities'

describe('Cancel 类单元测试', () => {
  test('Cancel 实例中具有 message 属性', () => {
    expect(new Cancel('test').message).toBe('test')
  })
  test('isCancel 可以用来判断 Cancel 实例', () => {
    const cancel = new Cancel()
    expect(isCancel(cancel)).toBeTruthy()
    expect(isCancel({})).toBeFalsy()
  })
})
