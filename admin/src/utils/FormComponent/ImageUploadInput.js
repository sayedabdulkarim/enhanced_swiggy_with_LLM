import React, { useState } from "react";
import { Upload, Button, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const getBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

const ImageUpload = ({ value, onChange }) => {
  const [loading, setLoading] = useState(false);

  const beforeUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
    }
    return isImage || Upload.LIST_IGNORE;
  };

  const handleChange = async (info) => {
    setLoading(true);
    if (info.file.status === "done" && info.file.originFileObj) {
      try {
        const base64 = await getBase64(info.file.originFileObj);
        setLoading(false);
        onChange(base64); // Notify Form that there is a new value
      } catch (error) {
        setLoading(false);
        message.error("File read failed: " + error.message);
      }
    } else if (info.file.status === "error") {
      setLoading(false);
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const dummyRequest = ({ file, onSuccess }) => {
    // Simulate a server response
    setTimeout(() => onSuccess("ok"), 0);
  };

  const uploadButton = (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      )}
    </div>
  );

  return (
    <Upload
      name="avatar"
      // listType="picture-card"
      showUploadList={false}
      onChange={handleChange}
      beforeUpload={beforeUpload}
      customRequest={dummyRequest} // Prevent actual POST request
    >
      {value ? (
        <img src={value} alt="avatar" style={{ width: "100%" }} />
      ) : (
        uploadButton
      )}
    </Upload>
  );
};

export default ImageUpload;
