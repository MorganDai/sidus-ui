"use strict";

var __rest = this && this.__rest || function (s, e) {
  var t = {};

  for (var p in s) {
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  }

  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var FormField_1 = require("./FormField");

var FormItem_1 = require("./FormItem");

var FormStoreContext_1 = require("./FormStoreContext");

var FormOptionsContext_1 = require("./FormOptionsContext");

function Form(props) {
  var _a = props.className,
      className = _a === void 0 ? '' : _a,
      children = props.children,
      store = props.store,
      onSubmit = props.onSubmit,
      options = __rest(props, ["className", "children", "store", "onSubmit"]);

  var classNames = 'sidus-form ' + className;
  return React.createElement(FormStoreContext_1["default"].Provider, {
    value: store
  }, React.createElement(FormOptionsContext_1["default"].Provider, {
    value: options
  }, React.createElement("form", {
    className: classNames,
    onSubmit: onSubmit
  }, children)));
}

Form.Field = FormField_1["default"];
Form.Item = FormItem_1["default"];
exports["default"] = Form;