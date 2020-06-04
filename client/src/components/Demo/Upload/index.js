import React, { useState } from "react";
import axios from "axios";
import loader from "../../../assets/images/loader.gif";

import "./Upload.css";

const Upload = (props) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleUpload = (e) => {
    setLoading(true);
    const files = e.target.files[0];
    const formData = new FormData();
    formData.append("upload_preset", "alternative-code");
    formData.append("file", files);
    axios
      .post("https://api.cloudinary.com/v1_1/df9kxcv1s/image/upload", formData)
      .then((res) => {
        setLoading(false);
        axios
          .put("https://alternative-code.herokuapp.com/api/upload", {
            id: props.id,
            avatar: res.data.secure_url,
          })
          .then((res) => {
            setSuccess(res.data.response);
            setTimeout(() => {
              setSuccess("");
              window.location.reload(false);
            }, 1500);
          });
      });
  };
  const successMessage =
    success !== "" ? <p className="successMessage">{success}</p> : null;

  const loadingMessage =
    loading !== false ? <p className="loadingMessage">{loading}</p> : null;
  return (
    <div className="upload">
      <p onClick={props.handleUpload} className="upload_exit">
        <i className="fas fa-times "></i>
      </p>
      {successMessage}
      <form>
        <input onChange={handleUpload} type="file" title="foo" name="file" />
        {loading ? <img src={loader} alt="loading..." /> : null}
      </form>
    </div>
  );
};

export default Upload;
