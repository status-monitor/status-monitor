/* eslint-disable @typescript-eslint/no-var-requires */
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');
const path = require('path');

module.exports = withTypescript(
  withSass({
    //   {
    webpack(config, options) {
      config.resolve.alias['@app'] = path.join(__dirname, 'src');
      config.resolve.alias['@common'] = path.join(__dirname, '..', 'common');

      config.module.rules.forEach(rule => {
        const ruleContainsTs = rule.test.toString().includes('ts|tsx');

        if (ruleContainsTs && rule.use && rule.use.loader === 'next-babel-loader') {
          rule.include = undefined;
        }
      });

      options.defaultLoaders.babel.options.configFile = path.join(__dirname, '.babelrc');

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
