import XMLHttpRequestMock from '../../dist/xmlhttprequest-jest-mock-common';
import { browserRequestOn as request } from '../module/browserRequest';

let mockObj;
beforeEach(() => {
  // main function returns an mock obj with further
  // testing functionality
  mockObj = XMLHttpRequestMock();
});

afterEach(() => {
  // clean up mock object
  mockObj.cleanUp();
});

describe('example', () => {
  it('should mock XMLHttpRequest', (done) => {
    const mockData = 'mock successfull';
    // set data to return from XMLHttpRequest
    // alternatively you can set status and ready state
    // for further testing
    mockObj.setData(mockData);

    request('www.google.com', (data) => {
      // will return out mock data
      expect(data).toBe(mockData);

      // mocked functions can also be tested against
      expect(mockObj.send).toHaveBeenCalled();
      expect(mockObj.open).toHaveBeenCalled();

      done();
    });
  });
});
