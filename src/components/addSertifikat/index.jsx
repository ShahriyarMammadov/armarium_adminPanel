import React, { useRef, useState } from "react";
import "./index.scss";
import imgg from "../../assets/images/adminuser.png";
import { Button, Form, message } from "antd";

const AddSertifikatPage = () => {
  const [slice, setSlice] = useState(16);
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);

  const coverImageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const deleteSertifikat = async (name) => {
    try {
      setLoading(true);
      const deleteBlog = await axios.delete(
        `https://armariumbackend-production.up.railway.app/blog/deleteBlogByName/${name}/${id}`
      );
      message.success("Blog uğurla silindi");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addSertifikat = async () => {
    try {
      if (coverImage.length === 0) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      const { data } = await axios.post(
        `https://armariumbackend-production.up.railway.app/blog/addBlog/${id}`,
        formData
      );
      coverImageRef.current.value = null;
      message.success(data?.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="addSertifikat">
      <h3>Sertifikatlar</h3>
      <div className="allSertifikat">
        <div>
          <img src={imgg} alt="" />
          <i
            className="fa-regular fa-trash-can"
            onClick={() => {
              deleteSertifikat(e._id);
            }}
          ></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
        <div>
          <img src={imgg} alt="" />
          <i className="fa-regular fa-trash-can"></i>
        </div>
      </div>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="vertical"
        initialValues={{
          size: "default",
        }}
        // onValuesChange={onFormLayoutChange}
        size={"default"}
        style={{
          margin: "0 auto",
        }}
      >
        <Form.Item label="Sertifikatın Şəkili: ">
          <input
            type="file"
            name="coverImage"
            onChange={handleFileChange}
            ref={coverImageRef}
          />
        </Form.Item>

        <Form.Item label="Əlavə Edilsin?">
          <Button
            loading={loading}
            onClick={() => {
              addSertifikat();
            }}
          >
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSertifikatPage;
