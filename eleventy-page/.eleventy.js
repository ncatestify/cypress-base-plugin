module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('pages/assets')
  return {
    dir: {
      input: 'pages',
      output: 'output',
      includes: '_includes',
      data: '_data'
    }
  }
}
