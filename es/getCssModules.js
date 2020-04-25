"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});

function isObject(val) {
  return val != null && _typeof(val) === 'object' && Array.isArray(val) === false;
}

function getCssModule(classes, module) {
  if (isObject(module) && Array.isArray(classes)) {
    return classes.map(function (item) {
      return module[item];
    }).join(' ');
  }

  return classes;
}

exports["default"] = getCssModule;