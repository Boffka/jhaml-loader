var fs = require('fs')

module.exports = function (source) {
  let loaderUtils, jhaml, query, result

  this.cacheable && this.cacheable(true)
  loaderUtils = require("loader-utils")
  jhaml = require('@soyuka/jhaml')
  query = loaderUtils.parseQuery(this.query)

  let callback = this.async()
  let engine = jhaml()

  fs.createReadStream(source)
  .pipe(engine)

  let chunks = []
  engine.on('data', function(str) {
    chunks.push(str)
  })

  engine.on('error', function(err) {
    callback(err)
  })

  engine.on('end', function() {
    callback(null, Buffer.concat(chunks).toString())
  })
}
