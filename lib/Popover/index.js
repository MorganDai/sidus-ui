"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var react_1 = require("react");

var ReactDOM = require("react-dom");

var classNames_1 = require("../../utils/classNames");

require("./index.scss");

var Popover = function Popover(props) {
  var rootDom = props.rootDom;
  var _a = props.title,
      title = _a === void 0 ? '' : _a,
      _b = props.content,
      content = _b === void 0 ? '' : _b,
      _c = props.gap,
      gap = _c === void 0 ? 15 : _c,
      _d = props.align,
      align = _d === void 0 ? 'center' : _d,
      children = props.children;

  var _e = react_1.useState(false),
      visible = _e[0],
      setVisible = _e[1];

  var _f = react_1.useState({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    transform: ''
  }),
      eventTarget = _f[0],
      setEventTarget = _f[1];

  var renderLayer = react_1.useCallback(function () {
    if (!rootDom) {
      rootDom = document.createElement('div');
      rootDom.style.position = 'absolute';
      rootDom.style.top = '0px';
      rootDom.style.left = '0px';
      rootDom.style.width = '100%';
    }

    document.body.appendChild(rootDom);
    var style = {
      left: eventTarget.left + 'px',
      top: eventTarget.top + Number(gap) + 'px',
      marginTop: eventTarget.height + "px",
      marginLeft: eventTarget.width / 2 + "px",
      transform: '',
      zIndex: 1001
    };

    if (align === 'center') {
      style.transform = 'translate(-50%)';
    } else if (align === 'right') {
      style.transform = 'translateX(-100%)';
      style.marginLeft = '0';
      style.marginLeft = eventTarget.width + "px";
    } else if (align === 'left') {
      style.marginLeft = '0px';
    }

    var child = React.createElement('div', {
      className: classNames_1.genClassName('popover-box_wrapper') + (" " + (visible ? 'visible' : ''))
    }, React.createElement("div", {
      className: classNames_1.genClassName('popover-box_context'),
      style: style,
      onClick: function onClick(e) {
        return e.nativeEvent.stopImmediatePropagation();
      }
    }, React.createElement("div", {
      className: classNames_1.genClassName('popover-box_title')
    }, title), React.createElement("div", {
      className: classNames_1.genClassName('popover-box_content')
    }, content)));
    ReactDOM.render(child, rootDom);
  }, [rootDom, visible, eventTarget]);

  var showModel = function showModel(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    var target = {
      left: e.nativeEvent.pageX - e.nativeEvent.offsetX,
      top: e.nativeEvent.pageY - e.nativeEvent.offsetY,
      width: e.nativeEvent.target.clientWidth,
      height: e.nativeEvent.target.clientHeight,
      transform: ''
    };
    setEventTarget(target);
    setVisible(true);
  };

  var triggerInvisible = function triggerInvisible() {
    setVisible(false);
  };

  react_1.useEffect(function () {
    renderLayer();
    document.body.addEventListener('click', triggerInvisible);
    return function () {
      if (rootDom) {
        document.body.addEventListener('click', triggerInvisible);
        document.body.contains(rootDom) && document.body.removeChild(rootDom);
      }
    };
  }, [eventTarget, renderLayer, rootDom, visible]);
  return React.createElement("div", {
    className: classNames_1.genClassName('popover_wrapper')
  }, React.createElement("div", {
    className: classNames_1.genClassName('popover_trigger'),
    onClick: showModel
  }, children));
};

exports["default"] = Popover;