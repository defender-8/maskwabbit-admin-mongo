import { useState } from 'react';

export default function useUploadImage() {
  const [imageLoading, setImageLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);

  const onChange = (info) => {
    if (info.file.status === 'uploading') {

      setImageLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      setImageLoading(false);
      setImageUrl('/' + info.file.response.imagePath);
    }
  }

  return { imageLoading, imageUrl, onChange };
}
