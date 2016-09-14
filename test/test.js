const loader = require('../')
const fs = require('fs')
const buffer = fs.readFileSync(`${__dirname}/fixtures/test.haml`)

describe('jhaml', function() {
  it('should transform buffer', function(cb) {
    loader.apply({async: function() {
      return function(err, result) {
        cb(err)
      }
    }}, [buffer])
  })
})
