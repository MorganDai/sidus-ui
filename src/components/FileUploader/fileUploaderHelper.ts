import { preventDefault } from '../../utils/tools';

interface CallbackProps {
  onFileChoose?: Function;
  onFileUploaded?: Function;
  fileNameJudgeFunc?: Function;
  fileTypeJudgeFunc?: Function;
  doChange?: Function;
}

function FileUploaderHelper(boxId: string, fileInputId: string, callback: CallbackProps) {
  return (function() {
    const {
      onFileChoose = () => {},
      onFileUploaded = () => {},
      fileNameJudgeFunc = () => {},
      fileTypeJudgeFunc = () => {},
      doChange = () => {}
    } = callback;
    const box = document.getElementById(`${boxId}`);
    const fileInput = document.getElementById(fileInputId);

    const doResponse = (file: File) => {
      let valid = true;

      valid = valid && (fileTypeJudgeFunc ? fileTypeJudgeFunc(file) : true);
      valid = valid && (fileNameJudgeFunc ? fileNameJudgeFunc(file) : true);

      if (valid) {
        // @ts-ignore
        onFileUploaded && onFileUploaded(file);
      }
    };

    // @ts-ignore
    const triggerFile = () => { fileInput.click(); };

    // @ts-ignore
    box.addEventListener('click', triggerFile);

    const changeCallback = (files) =>  {
      // @ts-ignore
      onFileChoose && onFileChoose(fileInput.files[0] || files);
      // @ts-ignore
      doResponse(fileInput.files[0] || files);
    }

    // @ts-ignore
    fileInput.addEventListener('change', changeCallback);

    // 拖拽文件
    if (typeof Worker !== 'undefined') {
      console.log('-------support-------');
      
      // @ts-ignore
      box.addEventListener('dragover', preventDefault);

      // @ts-ignore
      box.addEventListener(
        'drop',
        e => {
          preventDefault(e);
          const dt = e.dataTransfer;
          // @ts-ignore
          doChange(dt.files[0], true);
          // @ts-ignore
          changeCallback(dt.files[0]);
        },
        false
      );
    } else {
      console.log('浏览器不支持HTML5');
    }
  })();
}

export default FileUploaderHelper;
