/**
 * WebStorm related
 * Module resolution rules from webpack.config.js are now used for coding assistance.
 * @type {module:path}
 */
const path = require('path');
const fs = require('fs');

const alias = fs
  .readdirSync('./packages')
  .filter(pck => !pck.includes('.'))
  .reduce(
    (acc, packageName) => ({
      ...acc,
      [`meteor/quave:${packageName}`]: path.resolve(
        __dirname,
        `packages/${packageName}/`
      ),
    }),
    {}
  );

const config = {
  resolve: {
    extensions: ['*', '.js'],
    alias,
  },
};
module.exports = [config];
