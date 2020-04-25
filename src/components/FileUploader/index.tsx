import * as React from 'react';
import { useEffect } from 'react';
import { genClassName } from '../../utils/classNames';
import FileUploaderHelper from './fileUploaderHelper';
import './index.scss';

interface FileUploaderProps {
  label?: string;
  fileNameJudgeFunc?: Function;
  onFileChoose?: Function;
  onFileUploaded?: Function;
  fileTypeJudgeFunc?: Function;
}

const FileUploader = (props: FileUploaderProps) => {
  const prefix = 'file-uploader_';
  const {
    label,
    onFileChoose,
    onFileUploaded,
    fileNameJudgeFunc,
    fileTypeJudgeFunc
  } = props;

  const [uploaded, setUploaded] = React.useState(false);
  const [file, setFile] = React.useState({ name: '' });
  const fileUploaderId = Math.floor(Math.random() * 1000000);
  const inputId = Math.floor(Math.random() * 1000000);

  const doChange = (val: any) => {
    if (val) {
      setUploaded(true);
      setFile(val.nativeEvent.target.files[0]);
    } else {
      setUploaded(false);
    }
  };

  useEffect(() => {
    // @ts-ignore
    new FileUploaderHelper(
      'file-uploader' + fileUploaderId,
      'sidus-file-loader_input' + inputId,
      {
        onFileChoose,
        onFileUploaded,
        fileNameJudgeFunc,
        fileTypeJudgeFunc
      }
    );
  }, [
    fileNameJudgeFunc,
    fileTypeJudgeFunc,
    fileUploaderId,
    inputId,
    onFileChoose,
    onFileUploaded
  ]);

  return (
    <div
      className={genClassName(prefix + 'wrapper')}
      id={'file-uploader' + fileUploaderId}
      onClick={() => {}}
    >
      <div className={genClassName(prefix + 'box')}>
        <div
          className={`${genClassName(prefix + 'finished')}${uploaded ? ' uploaded' : ''}`}
        >
          {file ? file.name : ''}
        </div>
        <div className={genClassName(prefix + 'area') + (uploaded ? ' uploaded' : '')}>
          <div className={genClassName(prefix + 'add')} />
          <input
            type="file"
            hidden
            id={'sidus-file-loader_input' + inputId}
            onChange={doChange}
          />
        </div>
        <p className={genClassName(prefix + 'label') + (uploaded ? ' uploaded' : '')}>
          {label || '拖拽或选择上传控制固件'}
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
