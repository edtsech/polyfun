var fun = require('./../fun.js')
var test = require('tape');

var f = fun(function(val) {
  return val;
})

var Rabbit = function(){}

var f2 = fun(function(val) {
  return "default";
})

f2[Number] = function() {
  return 'number';
}

f2[String] = function() {
  return 'string'
}

f2[Rabbit] = function() {
  return 'rabbit';
}

f2[null] = function() {
  return 'null';
}

f2.define(undefined, function(t) {
  return 'undefined';
})

test('takes default implementation', function(t) {
  t.plan(1);
  var result = f(123)
  t.equal(result, 123)
})

test('support native types', function(t) {
  t.plan(1);
  var result = f2(123)
  t.equal(result, 'number')
})

test('supports object wrappers', function(t) {
  t.plan(1);
  var result = f2(new String('123'))
  t.equal(result, 'string')
})

test('supports custom types', function(t) {
  t.plan(1);
  var result = f2(new Rabbit())
  t.equal(result, 'rabbit')
})

test('supports null', function(t) {
  t.plan(1);
  var result = f2(null)
  t.equal(result, 'null')
})

test('supports undefined', function(t) {
  t.plan(1);
  var result = f2(undefined);
  t.equal(result, 'undefined')
})

test('supports functions without default implementation', function(t) {
  t.plan(1);
  var f = fun()
  t.equal(1,1)
})

test('.isSupported returns true if current type is supported', function(t) {
  t.plan(1);
  t.equal(f2.isSupported(String), true)
})

test('.hasDefault returns if function has a default implementation', function(t) {
  t.plan(1);
  t.equal(f2.hasDefault, true)
})
