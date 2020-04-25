"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("../constant/index");

var classNames = function classNames() {
  var classes = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    classes[_i] = arguments[_i];
  }

  return classes.filter(function (item) {
    return !!item;
  }).join(' ');
};

exports.classNames = classNames; // 将数组、对象的className配置转化为string

var resolveClassName = function resolveClassName(cls) {
  if (cls === undefined) {
    return "";
  }

  var classes = "";

  if (typeof cls === "string") {
    classes = cls;
  } else if (cls instanceof Array) {
    classes = cls.join(" ");
  } else {
    classes = Object.keys(cls).filter(function (key) {
      return !!cls[key];
    }).join(" ");
  }

  return classes;
};

exports.resolveClassName = resolveClassName;

var genClassName = function genClassName(cls, prefix) {
  if (prefix === void 0) {
    prefix = index_1.PREFIX;
  }

  return prefix + "-" + resolveClassName(cls);
};

exports.genClassName = genClassName;