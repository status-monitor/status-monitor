const path = require('path');

module.exports = {
  webpack(config, options) {
    config.resolve.alias['@app'] = path.join(__dirname, 'frontend');
    config.resolve.alias['@common'] = path.join(__dirname, 'common');
    config.resolve.alias['@api'] = path.join(__dirname, 'api');

    // config.module.rules.forEach(rule => {
    //   const ruleContainsTs = rule.test.toString().includes('tsx|ts');

    //   if (ruleContainsTs && rule.use && rule.use.loader === 'next-babel-loader') {
    //     rule.include = undefined;
    //   }
    // });

    // options.defaultLoaders.babel.options.configFile = path.join(__dirname, '.babelrc');

    // removeMinimizeOptionFromCssLoaders(config);
    return config;
  },
};

// function removeMinimizeOptionFromCssLoaders(config) {
//   config.module.rules.forEach(rule => {
//     if (Array.isArray(rule.use)) {
//       rule.use.forEach(u => {
//         if (u.loader === 'css-loader' && u.options) {
//           delete u.options.minimize;
//         }
//       });
//     }
//   });
// }
