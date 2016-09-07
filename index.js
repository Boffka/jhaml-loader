const streamBuffers = require('stream-buffers')

module.exports = function (source) {
  const loaderUtils = require("loader-utils")
  const jhaml = require('@soyuka/jhaml')
  const callback = this.async()
  const engine = jhaml()

  const myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
    frequency: 10,   // in milliseconds.
    chunkSize: 2048  // in bytes.
  });

  myReadableStreamBuffer.pipe(engine)
  myReadableStreamBuffer.put(source)
  myReadableStreamBuffer.stop()

  let chunks = []
  engine.on('data', function(str) {
    chunks.push(str)
  })

  engine.on('error', function(err) {
    callback(err)
  })

  engine.on('end', function() {
    callback(null, `module.exports = \`${Buffer.concat(chunks).toString()}\``)
  })
}
