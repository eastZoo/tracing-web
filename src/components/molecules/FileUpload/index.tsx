import React, { useState } from "react";
import axios from "axios";

interface FileUploadProps {
  project: string;
}
function FileUpload({ project }: FileUploadProps) {
  const [file, setFile] = useState<any>(null);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      return alert("Please select a file to upload");
    }

    const url = `${process.env.REACT_APP_API_HOST}/upload/${project}`;
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post(url, formData)
      .then((response) => {
        console.log("File uploaded successfully");
      })
      .catch((error) => {
        console.error("File upload error", error);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
