module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('assets')
  return {
    dir: {
      output: '../src',
    },
  }
}
