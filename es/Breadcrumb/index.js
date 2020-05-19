"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../utils/classNames");

var item_1 = require("./item");

require("./index.modules.css");

var Breadcrumb = function Breadcrumb(props) {
  var _a = props.separator,
      separator = _a === void 0 ? '/' : _a,
      // maxNode = 'auto',
  _b = props.children,
      // maxNode = 'auto',
  children = _b === void 0 ? [] : _b,
      _c = props.activeCls,
      activeCls = _c === void 0 ? '' : _c,
      _d = props.activeIdx,
      activeIdx = _d === void 0 ? -1 : _d;
  children.forEach(function (element) {
    // @ts-ignore
    if (!(element && typeof element.type === 'function' && element.type._typeMark === 'breadcrumb_item')) {
      throw new Error("Breadcrumb's children must be Breadcrumb.Item!");
    }
  });
  var items = [];
  var length = children.length;
  children.forEach(function (child, i) {
    var isActiveIdx = +activeIdx === -1 ? i === length - 1 : i === +activeIdx;
    items.push( // @ts-ignore
    React.cloneElement(child, {
      separator: separator,
      key: i,
      activeCls: isActiveIdx ? activeCls : '',
      activated: i === length - 1
    }));
  });
  return React.createElement("div", {
    className: classNames_1.genClassName('breadcrumb-wrapper')
  }, React.createElement("ul", {
    className: classNames_1.genClassName('breadcrumb')
  }, items));
};

Breadcrumb.Item = item_1["default"];
exports["default"] = Breadcrumb;