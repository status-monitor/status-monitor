/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withTypescript(
  withSass({
    //   {
    webpack(config) {
      config.resolve.alias['@app'] = path.join(__dirname, 'src');
      config.resolve.alias['@common'] = path.join(__dirname, '..', 'common');
      //   console.log(config);
      removeMinimizeOptionFromCssLoaders(config);
      return config;
    },
  }),
  //   },
);

function removeMinimizeOptionFromCssLoaders(config) {
  config.module.rules.forEach(rule => {
    if (Array.isArray(rule.use)) {
      rule.use.forEach(u => {
        if (u.loader === 'css-loader' && u.options) {
          delete u.options.minimize;
        }
      });
    }
  });
}
