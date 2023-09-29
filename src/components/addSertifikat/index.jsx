import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import imgg from "../../assets/images/adminuser.png";
import { Button, Form, Popconfirm, message } from "antd";
import axios from "axios";

const AddSertifikatPage = () => {
  const [slice, setSlice] = useState(16);
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [certificate, setCertificate] = useState([]);

  const coverImageRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const allSertifikat = async () => {
    try {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://armariumbackend-production.up.railway.app/about/allCertificate`
        );
        setCertificate(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {}
  };

  const deleteSertifikat = async (id) => {
    try {
      setLoading(true);
      const { data } = await axios.delete(
        `https://armariumbackend-production.up.railway.app/about/deleteCertificate/${id}`
      );
      message.success("Sertifikat uğurla silindi");
      allSertifikat();
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
        `https://armariumbackend-production.up.railway.app/about/addCertificate`,
        formData
      );
      coverImageRef.current.value = null;
      message.success(data?.message);
      allSertifikat();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allSertifikat();
  }, []);

  const cancel = () => {
    message.error("SİLİNMƏDİ");
  };

  return (
    <div id="addSertifikat">
      <h3>Sertifikatlar</h3>
      <div className="allSertifikat">
        {certificate?.map((e) => {
          return (
            <div>
              <img
                src={`https://armariumbackend-production.up.railway.app/images/${e?.coverImage}`}
                alt="certificate"
              />
              <Popconfirm
                title="Sertifikat"
                description="Sertifikat Həmişəlik Silinsin?"
                onConfirm={() => {
                  deleteSertifikat(e._id);
                }}
                onCancel={cancel}
                okText="SİL"
                cancelText="BAĞLA"
              >
                <i className="fa-regular fa-trash-can"></i>
              </Popconfirm>
            </div>
          );
        })}
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
