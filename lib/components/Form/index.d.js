"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Form: true,
  FormField: true,
  FormItem: true,
  FormStore: true,
  useFormStore: true,
  useFieldChange: true,
  useFormChange: true
};
Object.defineProperty(exports, "Form", {
  enumerable: true,
  get: function get() {
    return _Form["default"];
  }
});
Object.defineProperty(exports, "FormField", {
  enumerable: true,
  get: function get() {
    return _FormField["default"];
  }
});
Object.defineProperty(exports, "FormItem", {
  enumerable: true,
  get: function get() {
    return _FormItem["default"];
  }
});
Object.defineProperty(exports, "FormStore", {
  enumerable: true,
  get: function get() {
    return _FormStore["default"];
  }
});
Object.defineProperty(exports, "useFormStore", {
  enumerable: true,
  get: function get() {
    return _useFormStore["default"];
  }
});
Object.defineProperty(exports, "useFieldChange", {
  enumerable: true,
  get: function get() {
    return _useFieldChange["default"];
  }
});
Object.defineProperty(exports, "useFormChange", {
  enumerable: true,
  get: function get() {
    return _useFormChange["default"];
  }
});

var _Form = _interopRequireDefault(require("./Form"));

var _FormField = _interopRequireDefault(require("./FormField"));

var _FormItem = _interopRequireDefault(require("./FormItem"));

var _FormStore = _interopRequireWildcard(require("./FormStore"));

Object.keys(_FormStore).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _FormStore[key];
    }
  });
});

var _useFormStore = _interopRequireDefault(require("./useFormStore"));

var _useFieldChange = _interopRequireDefault(require("./useFieldChange"));

var _useFormChange = _interopRequireDefault(require("./useFormChange"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }