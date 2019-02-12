import xmlHttpRequestMock from '../dist/xmlhttprequest-jest-mock-common';
import { browserRequestOn, browserRequestEvent } from './module/browserRequest';

let mockObj;

beforeEach(() => {
  mockObj = xmlHttpRequestMock();
});

afterEach(() => {
  mockObj.cleanUp();
});

describe('index', () => {
  it('should export a function', () => {
    expect(typeof xmlHttpRequestMock).toBe('function');
  });

  it('should define XMLHttpRequest and clear it', () => {
    expect(typeof window.XMLHttpRequest).toBe('function');
    mockObj.cleanUp();
    expect(typeof window.XMLHttpRequest).toBe('undefined');
  });

  it('should mock data (onevent)', (done) => {
    const mockData = { message: 'mocked' };
    mockObj.setData(mockData);
    // static typing error on purpose
    browserRequestOn('https://www.superfakesite.com', (data) => {
      expect(data.message).toBe(mockData.message);
      done();
    });
  });

  it('should mock status (onevent)', (done) => {
    const mockData = { message: 'mocked', status: 404 };
    mockObj.setData(mockData, mockData.status);
    browserRequestOn('https://www.superfakesite.com', (data) => {
      expect(data.error).toBeTruthy();
      expect(data.error.status).toBe(mockData.status);
      done();
    });
  });

  it('should mock readystate (onevent)', (done) => {
    const mockData = { message: 'mocked', status: 404, readyState: 1 };
    mockObj.setData(mockData, mockData.status, mockData.readyState);
    browserRequestOn('https://www.superfakesite.com', (data) => {
      expect(data.error).toBeTruthy();
      expect(data.error.readyState).toBe(mockData.readyState);
      done();
    });
  });
  it('should mock data (addevent)', (done) => {
    const mockData = { message: 'mocked' };
    mockObj.setData(mockData);
    // static typing error on purpose
    browserRequestEvent('https://www.superfakesite.com', (data) => {
      expect(data.message).toBe(mockData.message);
      done();
    });
  });

  it('should mock status (addevent)', (done) => {
    const mockData = { message: 'mocked', status: 404 };
    mockObj.setData(mockData, mockData.status);
    browserRequestEvent('https://www.superfakesite.com', (data) => {
      expect(data.error).toBeTruthy();
      expect(data.error.status).toBe(mockData.status);
      done();
    });
  });

  it('should mock readystate (addevent)', (done) => {
    const mockData = { message: 'mocked', status: 404, readyState: 1 };
    mockObj.setData(mockData, mockData.status, mockData.readyState);
    browserRequestEvent('https://www.superfakesite.com', (data) => {
      expect(data.error).toBeTruthy();
      expect(data.error.readyState).toBe(mockData.readyState);
      done();
    });
  });
});
