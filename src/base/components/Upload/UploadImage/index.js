import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';

import { beforeImageUpload } from '../../../utils/file';

import Upload from '../index';

import cameraIcon from '../../../../assets/images/icons/camera.svg';

function UploadImage({ token, value, onChange, imageLoading, imageUrl }) {
  return (
    <Upload
      name="image"
      accept=".jpeg,.jpg,.png"
      listType="picture-card"
      showUploadList={false}
      action="/dashboard/upload"
      beforeUpload={beforeImageUpload}
      onChange={onChange}
      headers={
        { 'Authorization': 'Bearer ' + token }
      }
    >
      {value?.length || (imageUrl && value !== undefined) ?
        <img
          src={ imageUrl ? imageUrl : '/' + value}
          alt="avatar"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
          }} />
        : (
          <div>
            {imageLoading ? <LoadingOutlined /> : <img src={cameraIcon} alt="" />}
          </div>
        )
      }
    </Upload>
  );
}

export default UploadImage;
