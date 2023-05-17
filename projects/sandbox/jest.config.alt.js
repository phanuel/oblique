'use strict';

/*
 * When launching the tests with "ng test sandbox", the working directory is "./"
 * When launching the tests with "npm test -w sandbox", the working directory is "./projects/sandbox"
 * To keep both command working, an alternate configuration is necessary
 */
module.exports = require('./jest.config');
module.exports.rootDir = '../../';
