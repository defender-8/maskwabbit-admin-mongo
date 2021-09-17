import React, { useState, useEffect } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { beforeImageUpload } from '../../../../utils/file';

import Upload from '../index';

// import cameraIcon from '../../../../assets/images/icons/camera.svg';
// import './index.less';

function UploadImage({ token, imageUrl, imageLoading, setImageUrl, newItem, onChange }) {
  // const [imageLoading, setImageLoading] = useState(false);
  // const [imageUrl, setImageUrl] = useState(null);

  /*useEffect(() => {
    setImageUrl(dataImage);
  }, [dataImage]);*/

  /*useEffect(() => {
    if (newItem) {
      setImageUrl(null);
    }
  }, []);*/

  /*const handleUploadChange = (info) => {
    if (info.file.status === 'uploading') {

      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log('!!!!!!!!!!!! info.file.response.imagePath:\n', info.file.response.imagePath);
      setImageLoading(false);
      setImageUrl('/' + info.file.response.imagePath);
    }
  };*/

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
      {imageUrl ?
        <img
          src={imageUrl}
          alt="avatar"
          style={{
            maxHeight: '100%',
            maxWidth: '100%',
          }} />
        : (
          <div>
            {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
          </div>
        )
      }
    </Upload>
  );
}

export default UploadImage;
