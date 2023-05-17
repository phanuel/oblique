'use strict';

/*
 * When launching the tests with "ng run oblique:test:development", the working directory is "./"
 * When launching the tests with "npm test-debugging -w sandbox", the working directory is "./projects/oblique"
 * To keep both command working, an alternate configuration is necessary
 */
module.exports = require('./jest.config');
module.exports.rootDir = '../../';
