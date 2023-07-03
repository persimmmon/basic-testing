// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const value = simpleCalculator({ a: 5, b: 5, action: Action.Add });
    expect(value).toBe(10);
    expect(value).not.toBe(11);
    expect(value).toBeGreaterThan(9);
    expect(value).toBeGreaterThanOrEqual(8);
    expect(value).toBeLessThanOrEqual(12);
    expect(value).toBeLessThan(11);
    expect(value).toBeCloseTo(10.0000000000001);
  });

  test('should subtract two numbers', () => {
    const value = simpleCalculator({ a: 15, b: 5, action: Action.Subtract });
    expect(value).toBe(10);
    expect(value).not.toBe(11);
    expect(value).toBeGreaterThan(9);
    expect(value).toBeGreaterThanOrEqual(8);
    expect(value).toBeLessThanOrEqual(12);
    expect(value).toBeLessThan(11);
    expect(value).toBeCloseTo(10.0000000000001);
  });

  test('should multiply two numbers', () => {
    const value = simpleCalculator({ a: 2, b: 5, action: Action.Multiply });
    expect(value).toBe(10);
    expect(value).not.toBe(11);
    expect(value).toBeGreaterThan(9);
    expect(value).toBeGreaterThanOrEqual(8);
    expect(value).toBeLessThanOrEqual(12);
    expect(value).toBeLessThan(11);
    expect(value).toBeCloseTo(10.0000000000001);
  });

  test('should divide two numbers', () => {
    const value = simpleCalculator({ a: 100, b: 10, action: Action.Divide });
    expect(value).toBe(10);
    expect(value).not.toBe(11);
    expect(value).toBeGreaterThan(9);
    expect(value).toBeGreaterThanOrEqual(8);
    expect(value).toBeLessThanOrEqual(12);
    expect(value).toBeLessThan(11);
    expect(value).toBeCloseTo(10.0000000000001);
  });

  test('should exponentiate two numbers', () => {
    const value = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(value).toBe(8);
    expect(value).not.toBe(9);
    expect(value).toBeGreaterThan(7);
    expect(value).toBeGreaterThanOrEqual(7);
    expect(value).toBeLessThanOrEqual(14);
    expect(value).toBeLessThan(14);
    expect(value).toBeCloseTo(8.0000000000001);
  });

  test('should return null for invalid action', () => {
    const value = simpleCalculator({ a: 2, b: 3, action: 'Invalid' });
    expect(value).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const value = simpleCalculator({
      a: 'string',
      b: 3,
      action: Action.Multiply,
    });
    expect(value).toBeNull();
  });
});
