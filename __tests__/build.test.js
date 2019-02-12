import fs from 'fs';
import path from 'path';
import { write } from '../build/build';

jest.mock('fs');

describe('build', () => {
  it('should extract correct directory path', (done) => {
    const testPath = 'test/moreTest';
    const fileName = 'index.js';
    write(path.join(testPath, fileName), 'test code').then((r) => {
      expect(fs.existsSync).toHaveBeenCalledWith(testPath);
      done();
    });
  });
});
