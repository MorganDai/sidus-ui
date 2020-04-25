"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var FormStoreContext_1 = require("./FormStoreContext");

var useFieldChange_1 = require("./useFieldChange");

var index_1 = require("./utils/index");

function FormItem(props) {
  var _a;

  var name = props.name,
      _b = props.valueProp,
      valueProp = _b === void 0 ? 'value' : _b,
      _c = props.valueGetter,
      valueGetter = _c === void 0 ? index_1.getValueFromEvent : _c,
      children = props.children;
  var store = React.useContext(FormStoreContext_1["default"]);

  var _d = React.useState(name && store ? store.get(name) : undefined),
      value = _d[0],
      setValue = _d[1];

  var onChange = React.useCallback(function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    return name && store && store.set(name, valueGetter.apply(void 0, args));
  }, [name, store, valueGetter]);
  useFieldChange_1["default"](store, name, function () {
    setValue(store.get(name));
  });
  var child = children;

  if (name && store && React.isValidElement(child)) {
    var prop = index_1.getPropName(valueProp, child && child.type);
    var childProps = (_a = {}, _a[prop] = value, _a.onChange = onChange, _a);
    child = React.cloneElement(child, childProps);
  }

  return child;
}

exports["default"] = FormItem;