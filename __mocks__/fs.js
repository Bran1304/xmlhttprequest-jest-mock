module.exports = {
  mkdirSync: jest.fn(),
  existsSync: jest.fn(),
  writeFile: jest.fn((a, b, c, d) => d()),
};
