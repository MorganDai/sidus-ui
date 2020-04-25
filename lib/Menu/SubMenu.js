"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/* tslint:disable */

var React = require("react");

var Icon_1 = require("../Icon");

var MenuContext_1 = require("./MenuContext");

var classNames_1 = require("../../utils/classNames");

require("./SubMenu.modules.scss");

var SubMenu = React.forwardRef(function (props, ref) {
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
      _g = props.onTitleClick,
      onTitleClick = _g === void 0 ? function () {} : _g,
      children = props.children,
      title = props.title,
      id = props.id;
  var list = React.useRef(null);

  var _h = React.useState(collapsed),
      status = _h[0],
      setStatus = _h[1];

  var _j = React.useState(0),
      height = _j[0],
      setHeight = _j[1];

  var _k = React.useState(status ? 'right_arrow' : 'dropdown'),
      icon = _k[0],
      setIcon = _k[1];

  var trigger = function trigger(id) {
    // e.nativeEvent.stopImmediatePropagation();
    if (!underSub) {
      // @ts-ignore
      context.setParentSubMenu(list.current); // context.parentSubMenu = list.current;
    }

    if (list) {
      // @ts-ignore
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
  var titleCls = classNames_1.genClassName('submenu_title') + ' ' + (isActive && !disabled ? 'active' : '');
  return React.createElement(MenuContext_1["default"].Consumer, null, function () {
    return React.createElement("div", {
      className: classNames_1.genClassName('submenu_wrapper') + " " + popupClassName
    }, "// @ts-ignore", React.createElement("div", {
      className: titleCls,
      ref: ref,
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
});
exports["default"] = SubMenu;