'use strict';

/*
 * When launching the tests with "ng test oblique", the working directory is "./"
 * When launching the tests with "npm test -w oblique", the working directory is "./projects/oblique"
 * To keep both command working, an alternate configuration is necessary
 */
module.exports = require('./jest.config.prod');
module.exports.rootDir = '../../';
