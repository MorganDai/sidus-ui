"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var tools_1 = require("../utils/tools");

function FileUploaderHelper(boxId, fileInputId, callback) {
  return function () {
    var _a = callback.onFileChoose,
        onFileChoose = _a === void 0 ? function () {} : _a,
        _b = callback.onFileUploaded,
        onFileUploaded = _b === void 0 ? function () {} : _b,
        _c = callback.fileNameJudgeFunc,
        fileNameJudgeFunc = _c === void 0 ? function () {} : _c,
        _d = callback.fileTypeJudgeFunc,
        fileTypeJudgeFunc = _d === void 0 ? function () {} : _d;
    var box = document.getElementById("" + boxId);
    var fileInput = document.getElementById(fileInputId);

    var doResponse = function doResponse(file) {
      var valid = true;
      valid = valid && (fileTypeJudgeFunc ? fileTypeJudgeFunc(file) : true);
      valid = valid && (fileNameJudgeFunc ? fileNameJudgeFunc(file) : true);

      if (valid) {
        // @ts-ignore
        onFileUploaded && onFileUploaded(file);
      }
    }; // @ts-ignore


    box.addEventListener('click', function (e) {
      // e.preventDefault();
      // 点击上传
      // @ts-ignore
      fileInput.click();
    }); // @ts-ignore

    fileInput.addEventListener('change', function (e) {
      // @ts-ignore
      onFileChoose && onFileChoose(fileInput.files[0]); // @ts-ignore

      doResponse(fileInput.files[0]);
    }); // 拖拽文件

    if (typeof Worker !== 'undefined') {
      // @ts-ignore
      box.addEventListener('dragover', tools_1.preventDefault); // @ts-ignore

      box.addEventListener('drop', function (e) {
        tools_1.preventDefault(e);
        var dt = e.dataTransfer; // @ts-ignore

        var files = dt.files; // @ts-ignore

        doResponse(files[0]);
      }, false);
    } else {
      console.log('浏览器不支持HTML5');
    }
  }();
}

exports["default"] = FileUploaderHelper;