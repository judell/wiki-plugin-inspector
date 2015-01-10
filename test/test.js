(function() {
  var expect, inspector;

  inspector = require('../client/inspector');

  expect = require('expect.js');

  describe('inspector plugin', function() {
    return describe('expand', function() {
      return it('can make itallic', function() {
        var result;
        result = inspector.expand('hello *world*');
        return expect(result).to.be('hello <i>world</i>');
      });
    });
  });

}).call(this);

//# sourceMappingURL=test.js.map
