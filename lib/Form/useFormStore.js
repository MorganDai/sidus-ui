"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var FormStore_1 = require("./FormStore");

function useFormStore(values, rules) {
  if (values === void 0) {
    values = {};
  }

  if (rules === void 0) {
    rules = {};
  }

  return React.useMemo(function () {
    return new FormStore_1["default"](values, rules);
  }, [values, rules]);
}

exports["default"] = useFormStore;