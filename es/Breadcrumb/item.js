"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../utils/classNames");

var Item = function Item(props) {
  var children = props.children,
      link = props.link,
      _a = props.rtl,
      rtl = _a === void 0 ? false : _a,
      _b = props.separator,
      separator = _b === void 0 ? '/' : _b,
      _c = props.activeCls,
      activeCls = _c === void 0 ? '' : _c,
      activated = props.activated,
      _d = props.cls,
      cls = _d === void 0 ? '' : _d,
      _e = props.callback,
      callback = _e === void 0 ? function () {} : _e;
  return React.createElement("li", {
    dir: rtl ? 'rtl' : '',
    className: classNames_1.genClassName('breadcrumb-item') + " " + activeCls
  }, link ? React.createElement("a", {
    href: link,
    className: cls
  }, children) : React.createElement("span", {
    className: cls,
    onClick: callback
  }, children), activated ? null : React.createElement("span", {
    className: classNames_1.genClassName('breadcrumb-separator')
  }, separator));
};

Item._typeMark = 'breadcrumb_item';
exports["default"] = Item;