"use strict";

var __assign = void 0 && (void 0).__assign || function () {
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

Object.defineProperty(exports, "__esModule", {
  value: true
});

var index_1 = require("./utils/index");

var FormStore =
/** @class */
function () {
  function FormStore(values, rules) {
    if (values === void 0) {
      values = {};
    }

    if (rules === void 0) {
      rules = {};
    }

    this.listeners = [];
    this.errors = {};
    this.initialValues = values;
    this.values = index_1.deepCopy(values);
    this.rules = rules;
    this.get = this.get.bind(this);
    this.set = this.set.bind(this);
    this.reset = this.reset.bind(this);
    this.error = this.error.bind(this);
    this.validate = this.validate.bind(this);
    this.subscribe = this.subscribe.bind(this);
  }

  FormStore.prototype.notify = function (name) {
    this.listeners.forEach(function (listener) {
      return listener(name);
    });
  };

  FormStore.prototype.get = function (name) {
    return name === undefined ? __assign({}, this.values) : index_1.deepGet(this.values, name);
  };

  FormStore.prototype.set = function (name, value, validate) {
    var _this = this;

    if (validate === void 0) {
      validate = true;
    }

    if (typeof name === 'string') {
      index_1.deepSet(this.values, name, value);
      if (validate) this.validate(name);
      this.notify(name);
    } else if (name) {
      Object.keys(name).forEach(function (n) {
        return _this.set(n, name[n]);
      });
    }
  };

  FormStore.prototype.reset = function () {
    this.errors = {};
    this.values = index_1.deepCopy(this.initialValues);
    this.notify('*');
  };

  FormStore.prototype.error = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var name = args[0],
        value = args[1];
    if (args.length === 0) return this.errors;

    if (typeof name === 'number') {
      name = Object.keys(this.errors)[name];
    }

    if (args.length === 2) {
      if (value === undefined) {
        delete this.errors[name];
      } else {
        this.errors[name] = value;
      }
    }

    return this.errors[name];
  };

  FormStore.prototype.validate = function (name) {
    var _this = this;

    if (name === undefined) {
      Object.keys(this.rules).forEach(function (n) {
        return _this.validate(n);
      });
      this.notify('*');
      var message = this.error(0);
      var error = message === undefined ? undefined : new Error(message);
      return [error, this.get()];
    } else {
      var validator = this.rules[name];
      var value = this.get(name);
      var result = validator ? validator(value, this.values) : true;
      var message = this.error(name, result === true ? undefined : result || '');
      var error = message === undefined ? undefined : new Error(message);
      return [error, value];
    }
  };

  FormStore.prototype.subscribe = function (listener) {
    var _this = this;

    this.listeners.push(listener);
    return function () {
      var index = _this.listeners.indexOf(listener);

      if (index > -1) _this.listeners.splice(index, 1);
    };
  };

  return FormStore;
}();

exports["default"] = FormStore;