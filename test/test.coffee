# build time tests for inspector plugin
# see http://mochajs.org/

inspector = require '../client/inspector'
expect = require 'expect.js'

describe 'inspector plugin', ->

  describe 'expand', ->

    it 'can make itallic', ->
      result = inspector.expand 'hello *world*'
      expect(result).to.be 'hello <i>world</i>'
