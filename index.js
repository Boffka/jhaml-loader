module.exports = function (source) {
  var loaderUtils, jhaml, query, result

  this.cacheable && this.cacheable(true)
  loaderUtils = require("loader-utils")
  jhaml = require('jhaml')
  query = loaderUtils.parseQuery(this.query)
  try {
    result = jhaml.render(source, query)
  } catch (e) {
    this.emitError('JHAML:' + e)
    throw e
  }
  return "module.exports = " + JSON.stringify(result) + ";"
}
