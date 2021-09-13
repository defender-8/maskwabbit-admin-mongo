import React, { useCallback, useState } from 'react';
import { message } from 'antd';

import Upload from '../index';

import cameraIcon from '../../../../assets/images/icons/camera.svg';
import './index.less';

function getBase64(img) {
  return new Promise(function (resolve, reject) {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.readAsDataURL(img);
  });
}

function useUploader({ onChange }) {
  const [file, setFile] = useState();

  const onBeforeUpload = useCallback(function (file) {
    const isImage = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isImage) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    const isLarge = file.size / 1024 / 1024 < 5;
    if (!isLarge) {
      message.error('Image must smaller than 5MB!');
      return false;
    }
    getBase64(file).then((thumbUrl) => {
      file.thumbUrl = thumbUrl;
      setFile(file);
      onChange && onChange(file);
    });

    return false;
  }, []);

  const onDelete = useCallback(function (e) {
    e.stopPropagation();
    setFile(null);
    onChange && onChange(null);
  }, [file]);

  return {
    file, onBeforeUpload, onDelete,
  };
}

export default function UploadImage({ value, onChange }) {
  const { file, onBeforeUpload, onDelete } = useUploader({ onChange });

  return (
    <Upload
      name="logo"
      beforeUpload={onBeforeUpload}
      showUploadList={false}
      fileList={file ? [file] : []}
    >
      <div className="UploadImage">
        <div className="UploadImage-img-wr">
          {file || value
            ?
            <img
              src={file ? file.thumbUrl : value}
              className="UploadImage-img"
              alt=""
            />
            :
            <img src={cameraIcon} className="UploadImage-empty-icon" alt="" />
          }
        </div>
        {
          file || value
            ?
            <div className="UploadImage-action" onClick={onDelete}>
              Delete photo
            </div> : null
        }
      </div>
    </Upload>
  );
}
