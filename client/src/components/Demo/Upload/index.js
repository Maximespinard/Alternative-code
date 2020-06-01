import React, { useState, useEffect } from "react";
import axios from "axios";

const Upload = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleUpload = (e) => {
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "alternative-code");
    formData.append("file", files);
    setLoading(true);
    axios
      .post("https://api.cloudinary.com/v1_1/dtrd9seew/image/upload", formData)
      .then((res) => {
        axios
          .put("http://localhost:8000/api/upload", {
            id: props.id,
            avatar: res.data.secure_url,
          })
          .then((res) => {
            setSuccess(res.data.response);
            setLoading(false);
            setTimeout(() => {
              setSuccess("");
              window.location.reload(false);
            }, 3000);
          });
      })

      .then(setLoading(false));
  };
  const successMessage =
    success !== "" ? <p className="successMessage">{success}</p> : null;
  return (
    <div>
      {successMessage}
      {loading ? <h1>Loading...</h1> : null};
      <form>
        <input onChange={handleUpload} type="file" name="file" />
      </form>
    </div>
  );
};

export default Upload;
