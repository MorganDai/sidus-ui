"use strict";

var __spreadArrays = void 0 && (void 0).__spreadArrays || function () {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) {
    s += arguments[i].length;
  }

  for (var r = Array(s), k = 0, i = 0; i < il; i++) {
    for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++) {
      r[k] = a[j];
    }
  }

  return r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var context_1 = require("./context");

var classNames_1 = require("../utils/classNames");

var tools_1 = require("../utils/tools");

require("./index.css");

var CollapsePanel = function CollapsePanel(props) {
  var _a = props.id,
      id = _a === void 0 ? '' : _a,
      header = props.header,
      _b = props.disabled,
      disabled = _b === void 0 ? false : _b,
      _c = props.className,
      className = _c === void 0 ? '' : _c,
      _d = props.triggerId,
      triggerId = _d === void 0 ? '' : _d,
      children = props.children;
  var ref = React.useRef(null);
  var ctx = React.useContext(context_1.CollapseContext);

  var _e = React.useState(0),
      height = _e[0],
      setHeight = _e[1];

  var _f = React.useState( // @ts-ignore
  tools_1.toNumArray(ctx.activeKey).indexOf(+id) === -1),
      collapsed = _f[0],
      setCollapsed = _f[1];

  var cls = classNames_1.genClassName('collapse_wrapper') + ' ' + className;

  var trigger = function trigger(e) {
    var specifyTrigger = triggerId ? document.querySelector("#" + triggerId) : null; // @ts-ignore

    var noContainsAndNotEqual = specifyTrigger ? specifyTrigger !== e.target && !specifyTrigger.contains(e.target) : false;

    if (disabled || triggerId && noContainsAndNotEqual) {
      return;
    } // @ts-ignore


    var idx = tools_1.toNumArray(ctx.activeKey).indexOf(+id);
    var nextRes = false;

    if (idx === -1) {
      // @ts-ignore
      ctx.setActiveKey(__spreadArrays(tools_1.toNumArray(ctx.activeKey), [+id]));
    } else {
      // @ts-ignore
      var temp = tools_1.toNumArray(ctx.activeKey);
      temp.splice(idx, 1);
      nextRes = true; // @ts-ignore

      ctx.setActiveKey(__spreadArrays(temp));
    }

    setCollapsed(nextRes);
    ctx.onChange && ctx.onChange(nextRes);
  };

  React.useEffect(function () {
    if (collapsed) {
      setHeight(0);
    } else {
      // @ts-ignore
      setHeight(ref.current.clientHeight);
    }
  }, [collapsed]);
  var collapseCls = classNames_1.genClassName('collapse_content') + ' ' + (collapsed ? 'collapsed' : '');
  return React.createElement(context_1.CollapseContext.Consumer, null, function () {
    return React.createElement("div", {
      className: cls
    }, React.createElement("div", {
      className: classNames_1.genClassName('collase_header') + (disabled ? 'disabled' : ''),
      onClick: function onClick(e) {
        trigger(e);
      }
    }, header), React.createElement("div", {
      className: classNames_1.genClassName('collapse_box'),
      style: {
        height: height
      }
    }, React.createElement("div", {
      className: collapseCls,
      ref: ref
    }, children)));
  });
};

exports["default"] = CollapsePanel;