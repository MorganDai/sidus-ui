"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var MenuContext_1 = require("./MenuContext");

var classNames_1 = require("../utils/classNames");

require("./SubMenu.modules.css");

var MenuItemGroup = function MenuItemGroup(props) {
  var children = props.children,
      _a = props.cls,
      cls = _a === void 0 ? '' : _a,
      _b = props.title,
      title = _b === void 0 ? '' : _b,
      _c = props.titleCls,
      titleCls = _c === void 0 ? '' : _c;
  var titleClass = classNames_1.genClassName('item-group_title sidus-item-group');
  return React.createElement(MenuContext_1["default"].Consumer, null, function () {
    return React.createElement("div", {
      className: classNames_1.genClassName('item-group_wrapper') + " " + cls
    }, React.createElement("div", {
      className: titleClass + ' ' + titleCls
    }, title), React.createElement("div", {
      className: classNames_1.genClassName('item-group_box')
    }, children));
  });
};

exports["default"] = MenuItemGroup;