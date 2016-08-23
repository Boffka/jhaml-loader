var fs = require('fs')
var streamBuffers = require('stream-buffers')

module.exports = function (source) {
  console.log(source);
  let loaderUtils, jhaml, query, result

  loaderUtils = require("loader-utils")
  jhaml = require('@soyuka/jhaml')

  let callback = this.async()
  let engine = jhaml()

  var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
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
