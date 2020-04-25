"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

function isObject(obj) {
  return obj !== null && _typeof(obj) === 'object';
}

exports.isObject = isObject;

function deepGet(obj, path) {
  var parts = path.split('.');
  var length = parts.length;

  for (var i = 0; i < length; i++) {
    if (!isObject(obj)) return undefined;
    obj = obj[parts[i]];
  }

  return obj;
}

exports.deepGet = deepGet;

function deepSet(obj, path, value) {
  if (!isObject(obj)) return obj;
  var root = obj;
  var parts = path.split('.');
  var length = parts.length;

  for (var i = 0; i < length; i++) {
    var p = parts[i];

    if (i === length - 1) {
      obj[p] = value;
    } else if (!isObject(obj[p])) {
      obj[p] = {};
    }

    obj = obj[p];
  }

  return root;
}

exports.deepSet = deepSet;

function deepCopy(target) {
  var type = _typeof(target);

  if (target === null || type === 'boolean' || type === 'number' || type === 'string') {
    return target;
  }

  if (target instanceof Date) {
    return new Date(target.getTime());
  }

  if (Array.isArray(target)) {
    return target.map(function (o) {
      return deepCopy(o);
    });
  }

  if (_typeof(target) === 'object') {
    var obj = {};

    for (var key in target) {
      obj[key] = deepCopy(target[key]);
    }

    return obj;
  }

  return undefined;
}

exports.deepCopy = deepCopy;

function getPropName(valueProp, type) {
  return typeof valueProp === 'function' ? valueProp(type) : valueProp;
}

exports.getPropName = getPropName;

function getValueFromEvent() {
  var args = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    args[_i] = arguments[_i];
  }

  var e = args[0];
  return e && e.target ? e.target.type === 'checkbox' ? e.target.checked : e.target.value : e;
}

exports.getValueFromEvent = getValueFromEvent;