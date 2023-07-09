import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

jest.mock('lodash', () => {
  const originalModule = jest.requireActual<typeof import('lodash')>('lodash');
  return {
    __esModule: true,
    ...originalModule,
    throttle: jest.fn((fn) => fn),
  };
});

describe('throttledGetDataFromApi', () => {
  const PATH = 'users';
  const URL = 'https://jsonplaceholder.typicode.com';
  const mock = axios as jest.Mocked<typeof axios>;

  beforeEach(() => {
    mock.create = jest.fn(() => mock);
    mock.get.mockImplementationOnce(() => Promise.resolve({ data: PATH }));
  });

  test('should create instance with provided base url', async () => {
    await throttledGetDataFromApi(PATH);
    expect(mock.create).toHaveBeenCalledWith({
      baseURL: URL,
    });
  });

  test('should perform request to correct provided url', async () => {
    await throttledGetDataFromApi(PATH);
    expect(mock.get).toHaveBeenCalledWith(PATH);
  });

  test('should return response data', async () => {
    mock.get.mockResolvedValueOnce(PATH);
    const result = await throttledGetDataFromApi(PATH);
    expect(result).toEqual(PATH);
  });
});
