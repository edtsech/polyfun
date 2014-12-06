var f = fun(function(val) {
  return val;
})

var Rabbit = function(){}

var f2 = fun(function(val) {
  return "default";
})

f2.define(Number, function() {
  return 'number';
})

f2.define(String, function() {
  return 'string'
})

f2.define(Rabbit, function() {
  return 'rabbit';
})

f2.define(null, function() {
  return 'null';
})

f2.define(undefined, function(t) {
  return 'undefined';
})

describe('fun', function() {
  it('takes default implementation', function() {
    var result = f(123)
    expect(result).toBe(123)
  });

  it('support native types', function() {
    var result = f2(123)
    expect(result).toBe('number')
  })

  it('supports object wrappers', function() {
    var result = f2(new String('123'))
    expect(result).toBe('string')
  })

  it('supports custom types', function() {
    var result = f2(new Rabbit())
    expect(result).toBe('rabbit')
  })

  it('supports null', function() {
    var result = f2(null)
    expect(result).toBe('null')
  })

  it('supports undefined', function() {
    var result = f2(undefined);
    expect(result).toBe('undefined')
  })

  it('supports functions without default implementation', function() {
    var f = fun()
    expect(function () { f() }).toThrow(new TypeError("Type is not supported"))
  })

  describe('.isSupported', function() {
    it('.isSupported returns true if current type is supported', function() {
      expect(f2.isSupported(String)).toBe(true)
    })
  })

  describe('.hasDefault', function() {
    it('.hasDefault returns if function has a default implementation', function() {
      expect(f2.hasDefault()).toBe(true)
    })
  })

  describe('.supported', function() {
    it('stores supported types', function() {
      expect(!!f2.supportedTypes()[Number]).toBe(true)
      expect(!!f2.supportedTypes()[String]).toBe(true)
      expect(!!f2.supportedTypes()[Rabbit]).toBe(true)
      expect(!!f2.supportedTypes()[null]).toBe(true)
      expect(!!f2.supportedTypes()[undefined]).toBe(true)
    })
  })
})
