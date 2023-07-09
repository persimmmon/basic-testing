import {
  doStuffByTimeout,
  doStuffByInterval,
  readFileAsynchronously,
} from './index';
import path from 'path';
import fs from 'fs';
import fsProm from 'fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(setTimeout).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);
    expect(callback).not.toBeCalled();
    jest.runAllTimers();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(setInterval).toHaveBeenLastCalledWith(callback, 1000);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);
    expect(callback).not.toBeCalled();
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(1);
    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    jest.spyOn(path, 'join');
    const pathToFile = 'file.txt';
    readFileAsynchronously(pathToFile);
    expect(path.join).toHaveBeenLastCalledWith(__dirname, pathToFile);
  });

  test('should return null if file does not exist', async () => {
    expect(await readFileAsynchronously('non-existing-file.md')).toBe(null);
  });

  test('should return file content if file exists', async () => {
    const pathToFile = 'file.txt';
    const fileContent = 'This is what file contains.';
    fs.existsSync = jest.fn(() => true);
    fsProm.readFile = jest.fn().mockResolvedValue(fileContent);
    expect(await readFileAsynchronously(pathToFile)).toBe(fileContent);
  });
});
