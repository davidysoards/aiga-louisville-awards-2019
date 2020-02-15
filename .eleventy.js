module.exports = function(eleventyConfig) {
  // Default layout alias
  eleventyConfig.addLayoutAlias('default', 'layouts/base.njk');

  // Minify js files
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

  // Pass thru static files
  eleventyConfig.addPassthroughCopy('./src/site/fonts');
  eleventyConfig.addPassthroughCopy('./src/site/images');
  eleventyConfig.addPassthroughCopy('./src/site/css');
  eleventyConfig.addPassthroughCopy('./src/site/*.png');
  eleventyConfig.addPassthroughCopy('./src/site/*.ico');

  return {
    pathPrefix: '/awards-show-2019/',
    dir: {
      input: 'src/site',
      output: 'dist',
    },
    templateFormats: ['njk', 'md'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
  };
};
