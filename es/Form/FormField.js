"use strict";

var __assign = this && this.__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) {
        if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
      }
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

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

var FormStoreContext_1 = require("./FormStoreContext");

var useFieldChange_1 = require("./useFieldChange");

var FormOptionsContext_1 = require("./FormOptionsContext");

var index_1 = require("./utils/index");

function FormField(props) {
  var _a;

  var className = props.className,
      label = props.label,
      name = props.name,
      _b = props.hideErrors,
      hideErrors = _b === void 0 ? true : _b,
      _c = props.valueProp,
      valueProp = _c === void 0 ? 'value' : _c,
      _d = props.valueGetter,
      valueGetter = _d === void 0 ? index_1.getValueFromEvent : _d,
      suffix = props.suffix,
      children = props.children,
      restProps = __rest(props, ["className", "label", "name", "hideErrors", "valueProp", "valueGetter", "suffix", "children"]);

  var store = React.useContext(FormStoreContext_1["default"]);
  var options = React.useContext(FormOptionsContext_1["default"]);

  var _e = React.useState(name && store ? store.get(name) : undefined),
      value = _e[0],
      setValue = _e[1];

  var _f = React.useState(name && store ? store.error(name) : undefined),
      error = _f[0],
      setError = _f[1];

  var onChange = React.useCallback(function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return name && store && store.set(name, valueGetter.apply(void 0, args));
  }, [name, store, valueGetter]);
  useFieldChange_1["default"](store, name, function () {
    setValue(store.get(name));
    setError(store.error(name));
  });
  var child = children;

  if (name && store && React.isValidElement(child)) {
    var prop = index_1.getPropName(valueProp, child && child.type);
    var childProps = (_a = {}, _a[prop] = value, _a.onChange = onChange, _a);
    child = React.cloneElement(child, childProps);
  }

  var _g = __assign(__assign({}, options), restProps),
      inline = _g.inline,
      compact = _g.compact,
      required = _g.required,
      labelWidth = _g.labelWidth,
      gutter = _g.gutter,
      errorClassName = _g.errorClassName;

  var classNames = [classes.field, inline ? classes.inline : '', compact ? classes.compact : '', required ? classes.required : '', error ? classes.error : '', className ? className : '', error ? errorClassName : ''].join('');
  var headerStyle = {
    width: labelWidth,
    marginRight: gutter
  };
  return React.createElement("div", {
    className: classNames
  }, label !== undefined && React.createElement("div", {
    className: classes.header,
    style: headerStyle
  }, label), React.createElement("div", {
    className: classes.container
  }, React.createElement("div", {
    className: classes.control
  }, child), hideErrors ? "" : React.createElement("div", {
    className: classes.message
  }, error)), suffix !== undefined && React.createElement("div", {
    className: classes.footer
  }, suffix));
}

exports["default"] = FormField;
var classes = {
  field: 'sidus-form-field ',
  inline: 'sidus-form-field--inline ',
  compact: 'sidus-form-field--compact ',
  required: 'sidus-form-field--required ',
  error: 'sidus-form-field--error ',
  header: 'sidus-form-field__header',
  container: 'sidus-form-field__container',
  control: 'sidus-form-field__control',
  message: 'sidus-form-field__message',
  footer: 'sidus-form-field__footer'
};