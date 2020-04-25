"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var tools_1 = require("../../utils/tools");

var classNames_1 = require("../../utils/classNames");

require("./index.scss");

var Avatar = function Avatar(props) {
  var _a = props.url,
      url = _a === void 0 ? '' : _a,
      _b = props.alt,
      alt = _b === void 0 ? '' : _b,
      _c = props.cls,
      cls = _c === void 0 ? '' : _c,
      _d = props.type,
      type = _d === void 0 ? 'circle' : _d,
      _e = props.size,
      size = _e === void 0 ? 'middle' : _e,
      onHover = props.onHover,
      onClick = props.onClick;
  var wrapperCls = classNames_1.genClassName('avatar_wrapper ' + cls + ' ' + (url ? ' fz-0 ' : ''));
  wrapperCls += type === 'circle' ? 'bdr-percent-half' : 'bdr-px-6';

  var handleClick = function handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    onClick ? onClick(e) : tools_1.doNothing();
  };

  return React.createElement("div", {
    className: wrapperCls + ' ' + size
  }, React.createElement("div", {
    className: classNames_1.genClassName('avatar'),
    style: {
      backgroundImage: "url(" + url + ")"
    },
    onMouseOver: function onMouseOver(e) {
      return onHover ? onHover(e) : tools_1.doNothing();
    },
    onClick: handleClick
  }, alt));
};

exports["default"] = Avatar;