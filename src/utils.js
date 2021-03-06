/**
 * Created with JetBrains WebStorm.
 * Date: 13-5-25
 * Time: 下午12:41
 * @overview a group of functions
 * @author Meathill <meathill@gmail.com> (http://blog.meathill.com/)
 * @since 0.1
 */

var slice = Array.prototype.slice,
    toString = Object.prototype.toString;

function isArray(obj) {
  if ('isArray' in Array) {
    return Array.isArray(obj);
  }
  return Object.prototype.toString.call(obj) === '[object Array]';
}
function isFunction(obj) {
  return toString.call(obj) === '[object Function]';
}
function isObject(obj) {
  return obj === Object(obj);
}
function isString(obj) {
  return toString.call(obj) === '[object String]';
}
function object(obj) {
  function F() {}
  F.prototype = obj;
  return new F();
}
function inherit(superClass, subClass) {
  var prototype = object(superClass.prototype);
  prototype.constructor = subClass;
  subClass.prototype = prototype;
}
function extend(obj) {
  var args = slice.call(arguments, 1);
  for (var i = 0, len = args.length; i < len; i++) {
    var source = args[i];
    for (var prop in source) {
      obj[prop] = source[prop];
    }
  }
  return obj;
}
function parseNamespace(str, root) {
  if (!str) {
    return false;
  }
  var arr = str.split('.'),
      root = root || global;
  for (var i = 0, len = arr.length; i < len; i++) {
    if (!(arr[i] in root)) {
      return false;
    }
    root = root[arr[i]];
  }
  return root;
}