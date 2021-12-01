import { message } from "antd";

const beforeImageUpload = (file) => {
  const isLt1M = file.size / 1024 / 1024 < 1;
  if (!isLt1M) {
    message.error("Image must be smaller than 1MB!");
    return false;
  }
};

export { beforeImageUpload };
