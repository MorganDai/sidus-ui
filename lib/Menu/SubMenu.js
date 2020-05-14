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
/* tslint:disable */

var React = require("react");

var Icon_1 = require("../Icon");

var MenuContext_1 = require("./MenuContext");

var classNames_1 = require("../utils/classNames");

require("./SubMenu.modules.css");

var SubMenu = function SubMenu(props) {
  var context = React.useContext(MenuContext_1["default"]);
  var _a = props.disabled,
      disabled = _a === void 0 ? false : _a,
      _b = props.disableCollapse,
      disableCollapse = _b === void 0 ? false : _b,
      _c = props.collapsed,
      collapsed = _c === void 0 ? true : _c,
      _d = props.underSub,
      underSub = _d === void 0 ? false : _d,
      _e = props.popupClassName,
      popupClassName = _e === void 0 ? '' : _e,
      _f = props.noIcon,
      noIcon = _f === void 0 ? false : _f,
      _g = props.triggerRef,
      triggerRef = _g === void 0 ? null : _g,
      _h = props.onTitleClick,
      onTitleClick = _h === void 0 ? function () {} : _h,
      children = props.children,
      title = props.title,
      id = props.id;
  var list = React.useRef(null);

  var _j = React.useState(collapsed),
      status = _j[0],
      setStatus = _j[1];

  var _k = React.useState(0),
      height = _k[0],
      setHeight = _k[1];

  var _l = React.useState(status ? 'right_arrow' : 'dropdown'),
      icon = _l[0],
      setIcon = _l[1];

  var trigger = function trigger(id) {
    // e.nativeEvent.stopImmediatePropagation();
    // @ts-ignore
    if (!underSub) {
      context.setParentSubMenu(list.current);
    } // @ts-ignore


    if (list) {
      setHeight(list.current.clientHeight);
    }

    if (disableCollapse) {
      return;
    }

    if (!status) {
      setHeight(0);
    }

    setIcon(status ? 'dropdown' : 'right_arrow');
    setStatus(!status); // @ts-ignore

    context.setActiveKeys(id);
    onTitleClick(id);
  };

  React.useEffect(function () {
    if (underSub && context.parentSubMenu) {
      //@ts-ignore
      var parentNode = context.parentSubMenu.parentElement;
      parentNode.style.height = 'auto';
    }
  }, [status]);
  var temp = Array.isArray(context.activeKey) ? context.activeKey.map(function (item) {
    return '' + item;
  }) : [context.activeKey]; // @ts-ignore

  var isActive = temp.indexOf(id) !== -1;
  var titleCls = classNames_1.genClassName('submenu_title') + ' ' + (isActive && !disabled ? 'active' : ''); // @ts-ignore

  var BoxDiv = React.forwardRef(function (props, ref) {
    return React.createElement("div", __assign({}, props, {
      ref: ref
    }), props.children);
  });
  return React.createElement(MenuContext_1["default"].Consumer, null, function () {
    return React.createElement("div", {
      className: classNames_1.genClassName('submenu_wrapper') + " " + popupClassName
    }, React.createElement(BoxDiv, {
      className: titleCls,
      ref: triggerRef,
      onClick: function onClick() {
        return trigger(id);
      }
    }, title, !disableCollapse && !noIcon ? React.createElement(Icon_1["default"], {
      name: icon
    }) : ''), React.createElement("div", {
      className: classNames_1.genClassName('submenu_box') + ' ' + (status ? 'collapsed' : ''),
      style: {
        height: height + 'px'
      }
    }, React.createElement("div", {
      className: classNames_1.genClassName('submenu_box-rep'),
      ref: list
    }, children)));
  });
};

exports["default"] = SubMenu;