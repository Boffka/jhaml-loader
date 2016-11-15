function JhamlLoader(source) {
  const loaderUtils = require("loader-utils")
  const jhaml = require('@soyuka/jhaml')
  const callback = this.async()
  const engine = jhaml()

  let chunks = []
  engine.on('data', function(str) {
    chunks.push(str)
  })

  engine.on('error', function(err) {
    callback(err)
  })

  engine.on('end', function() {
    callback(null, `module.exports = "${Buffer.concat(chunks).toString().replace(/\"/g, '\\"').replace(/(?:\r\n|\r|\n)/g, '\\n')}"`)
  })

  engine.write(source)
  engine.end()

}

JhamlLoader.raw = true

module.exports = JhamlLoader
