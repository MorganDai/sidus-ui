"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var classNames_1 = require("../utils/classNames");

require("./index.css");

var Tag = function Tag(props) {
  var _a = props.label,
      label = _a === void 0 ? 'label' : _a,
      _b = props.type,
      type = _b === void 0 ? '' : _b,
      _c = props.doClick,
      doClick = _c === void 0 ? function () {} : _c;
  var cls = type === 'primary' ? 'primary' : '';

  var triggerClick = function triggerClick() {
    doClick();
  };

  return React.createElement("div", {
    onClick: triggerClick,
    className: classNames_1.genClassName('tag_wrapper') + ' ' + cls
  }, label);
};

exports["default"] = Tag;