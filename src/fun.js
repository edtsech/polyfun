!function(root) {
  var toClass = {}.toString;

  fun = function (func) {
    var table = {};

    var fn = function () {
      var f, obj;
      obj = arguments[0];

      if (null === obj) {
        f = table[null];
      } else if (undefined === obj) {
        f = table[undefined];
      } else {
        f = table[toClass.call(obj).match(/[A-Z].\w+/)[0]] ||
            table[obj.constructor];
      }

      if (f) {
        return f.apply(this, arguments);
      } else if (func) {
        return func.apply(this, arguments);
      } else {
        throw new TypeError('Type is not supported');
      }
    }

    fn.isSupported = function (type) {
      return !!table[type];
    }

    fn.supportedTypes = function() {
      return table;
    }

    fn.hasDefault = function() {
      return !!func;
    }

    fn.define = function(type, func) {
      table[type] = func;
    }

    return fn;
  }

}(this)
