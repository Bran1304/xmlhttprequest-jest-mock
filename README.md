# xmlhttprequest-jest-mock [![Build Status](https://travis-ci.org/erdembircan/xmlhttprequest-jest-mock.svg?branch=master)](https://travis-ci.org/erdembircan/xmlhttprequest-jest-mock)

> *XMLHttpRequest* mock module for Jest testing framework

### Introduction
`xmlhttprequest-jest-mock` is a mocking module for native browser `XMLHttpRequest` function.
- custom data inject for testing request responses
- full control over request functions and properties
- mocked native functions to spy on inner functions/properties of request

### Development Setup
``` bash
# install dependencies
npm install

# start dev test server
npm test:unit:Dev

# start dev build with watch option
npm build:Dev
``` 

## Usage
### Installation
`npm i xmlhttprequest-jest-mock`

Please refer to `__tests__/example/example.test.js` for a sample usage.

## API
### mainMock
- **type**: `Function`
- **returns**: `mockObject`
- **description**: This is the main function that will be returned as a result of your require/import statement. Executing it will setup necessary steps to mock native `XMLHttpRequest`. Returned `mockObject` is key for further testing.


### mockObject
- **type**: `object`
- **props**:
    - `setData`: sets data to return on request
        - type: `Function`
        - arguments:
            - `newData`: data to be return on request 
              - type: `any`
            - `newStatus`: new status for response
              - type: `number`
              - default: `200`
            - `newReadyState`: new readystate code for response
              - type: `number`
              - default: `4`
    - `cleanUp`: clean up mocked implementation 
        - type: `Function`
    - [`open`, `onreadystatechange`, `addEventListener`, `send`]: spyed on native functions of `XMLHttpRequest`
        - types: `Function`
- **description**: Object with various methods for testing.

## Contribution
Please fell free to contact for any updates/bugs.

## License
[MIT](http://opensource.org/licenses/MIT)

Erdem Bircan (c) 2019-present 
