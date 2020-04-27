"use strict";
exports.__esModule = true;
function isObject(val) {
    return val != null && typeof val === 'object' && Array.isArray(val) === false;
}
function getCssModule(classes, module) {
    if (isObject(module) && Array.isArray(classes)) {
        return classes.map(function (item) { return module[item]; }).join(' ');
    }
    return classes;
}
exports["default"] = getCssModule;
