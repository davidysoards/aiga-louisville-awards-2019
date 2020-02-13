const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  // Layout aliases
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

  // compress and combine js files
  eleventyConfig.addFilter('jsmin', code => {
    const Terser = require('terser');
    let minified = Terser.minify(code);
    if (minified.error) {
      console.log('Terser error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify the HTML in prod
  if (process.env.NODE_ENV == 'production') {
    eleventyConfig.addTransform(
      'htmlmin',
      require('./src/utils/minify-html.js')
    );
  }

  // Filters
  eleventyConfig.addFilter('dateformat', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'America/New_York',
    }).toFormat('LLLL d, y');
  });

  // Pass thru static files
  eleventyConfig.addPassthroughCopy('./src/site/fonts');
  eleventyConfig.addPassthroughCopy('./src/site/images');
  eleventyConfig.addPassthroughCopy('./src/site/css');

  return {
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    templateFormats: ['njk', 'md'],
  };
};
