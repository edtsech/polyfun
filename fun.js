!function() {
  var toClass = {}.toString

  var fun = function (func) {
    var fn = function () {
      var f, obj;
      obj = arguments[0];

      if (null === obj) {
        f = fn[null];
      } else if (undefined === obj) {
        f = fn[undefined];
      } else {
        f = fn[toClass.call(obj).match(/[A-Z].\w+/)[0]] ||
            fn[obj.constructor]
      }

      if (f) {
        return f.apply(this, arguments)
      } else if (func) {
        return func.apply(this, arguments)
      } else {
        // throw 'Type is not supported'
      }
    }

    fn.hasDefault = !!func;

    fn.isSupported = function (type) {
      return !!fn[type]
    }

    fn.define = function(type, func) {
      fn[type] = func;
    }

    return fn
  }

  module.exports = fun;

}()
