"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function doNothing() {}

exports.doNothing = doNothing;

function toNumArray(target) {
  return Array.isArray(target) ? target.map(function (item) {
    return +item;
  }) : [+target];
}

exports.toNumArray = toNumArray;

function preventDefault(e) {
  e.preventDefault();
}

exports.preventDefault = preventDefault;