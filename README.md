# Polyfun

Polyfun allows you to write functions which supports single dispatch on type.
It means you can write polymorphic functions or extend third-party functions for specific types.

##### Define function without any implementation:

``` js
var f = fun()
```

Add support for specific type:

``` js
f.define(Number, function() {
  return 'number'
})

f(12) // => 'number'

f("12") // => throw new TypeError("Type is not supported")
```

Type dispatching works on:

* null
* undefined
* native types
* custom types

##### How to check if type is supported by particular "poly" function?

``` js
// Simple version
!!f[String]

// Fancy version
f.isSupported(String)
```

##### Define function with default implementation:

``` js
var indentity = fun(function(val) {
  return val;
})

identity(1) // => 1
```

##### How to check if 'poly' function has a default implementation?

``` js
// There is property for that:
f.hasDefault
```

##### Extend existing functions
