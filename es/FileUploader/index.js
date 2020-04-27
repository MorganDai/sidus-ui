"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var React = require("react");

var react_1 = require("react");

var classNames_1 = require("../utils/classNames");

var fileUploaderHelper_1 = require("./fileUploaderHelper");

require("./index.css");

var FileUploader = function FileUploader(props) {
  var prefix = 'file-uploader_';
  var label = props.label,
      onFileChoose = props.onFileChoose,
      onFileUploaded = props.onFileUploaded,
      fileNameJudgeFunc = props.fileNameJudgeFunc,
      fileTypeJudgeFunc = props.fileTypeJudgeFunc;

  var _a = React.useState(false),
      uploaded = _a[0],
      setUploaded = _a[1];

  var _b = React.useState({
    name: ''
  }),
      file = _b[0],
      setFile = _b[1];

  var fileUploaderId = Math.floor(Math.random() * 1000000);
  var inputId = Math.floor(Math.random() * 1000000);

  var doChange = function doChange(val) {
    if (val) {
      setUploaded(true);
      setFile(val.nativeEvent.target.files[0]);
    } else {
      setUploaded(false);
    }
  };

  react_1.useEffect(function () {
    // @ts-ignore
    new fileUploaderHelper_1["default"]('file-uploader' + fileUploaderId, 'sidus-file-loader_input' + inputId, {
      onFileChoose: onFileChoose,
      onFileUploaded: onFileUploaded,
      fileNameJudgeFunc: fileNameJudgeFunc,
      fileTypeJudgeFunc: fileTypeJudgeFunc
    });
  }, [fileNameJudgeFunc, fileTypeJudgeFunc, fileUploaderId, inputId, onFileChoose, onFileUploaded]);
  return React.createElement("div", {
    className: classNames_1.genClassName(prefix + 'wrapper'),
    id: 'file-uploader' + fileUploaderId,
    onClick: function onClick() {}
  }, React.createElement("div", {
    className: classNames_1.genClassName(prefix + 'box')
  }, React.createElement("div", {
    className: "" + classNames_1.genClassName(prefix + 'finished') + (uploaded ? ' uploaded' : '')
  }, file ? file.name : ''), React.createElement("div", {
    className: classNames_1.genClassName(prefix + 'area') + (uploaded ? ' uploaded' : '')
  }, React.createElement("div", {
    className: classNames_1.genClassName(prefix + 'add')
  }), React.createElement("input", {
    type: "file",
    hidden: true,
    id: 'sidus-file-loader_input' + inputId,
    onChange: doChange
  })), React.createElement("p", {
    className: classNames_1.genClassName(prefix + 'label') + (uploaded ? ' uploaded' : '')
  }, label || '拖拽或选择上传控制固件')));
};

exports["default"] = FileUploader;