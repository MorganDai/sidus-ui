import { preventDefault } from '../../utils/tools';

interface CallbackProps {
  onFileChoose?: Function;
  onFileUploaded?: Function;
  fileNameJudgeFunc?: Function;
  fileTypeJudgeFunc?: Function;
}

function FileUploaderHelper(boxId: string, fileInputId: string, callback: CallbackProps) {
  return (function() {
    const {
      onFileChoose = () => {},
      onFileUploaded = () => {},
      fileNameJudgeFunc = () => {},
      fileTypeJudgeFunc = () => {}
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
    box.addEventListener('click', e => {
      e.stopPropagation();
      // 点击上传
      // @ts-ignore
      fileInput.click();
    });

    // @ts-ignore
    fileInput.addEventListener('change', e => {
      // @ts-ignore
      onFileChoose && onFileChoose(fileInput.files[0]);
      // @ts-ignore
      doResponse(fileInput.files[0]);
    });

    // 拖拽文件
    if (typeof Worker !== 'undefined') {
      // @ts-ignore
      box.addEventListener('dragover', preventDefault);

      // @ts-ignore
      box.addEventListener(
        'drop',
        e => {
          preventDefault(e);

          const dt = e.dataTransfer;
          // @ts-ignore
          const files = dt.files;
          // @ts-ignore
          doResponse(files[0]);
        },
        false
      );
    } else {
      console.log('浏览器不支持HTML5');
    }
  })();
}

export default FileUploaderHelper;
