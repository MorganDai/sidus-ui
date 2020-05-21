"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
function doNothing() {
}
exports.doNothing = doNothing;
function toNumArray(target) {
    return Array.isArray(target) ? __spreadArrays(target.map(function (item) { return +item; })) : [+target];
}
exports.toNumArray = toNumArray;
function preventDefault(e) {
    e.preventDefault();
}
exports.preventDefault = preventDefault;
