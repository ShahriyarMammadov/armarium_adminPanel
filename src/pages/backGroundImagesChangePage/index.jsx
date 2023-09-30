import React, { useEffect, useState } from "react";
import "./index.scss";
import { Button, Image, Modal, message } from "antd";
import axios from "axios";

const BackGroundChangePage = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const [coverImage, setCoverImage] = useState(null);

  const [imageUrls, setAllBackImages] = useState([]);

  const getAllImages = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/backImage/getAllBackImage`
      );
      setAllBackImages(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllImages();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    try {
      if (!coverImage) {
        return message.error("Zəhmət Olmasa Yeni Şəkil Seçin");
      }
      const imageUrl = URL.createObjectURL(coverImage);
      const newImageUrls = [...imageUrls];
      newImageUrls[selectedImageIndex].coverImage = imageUrl;
      setAllBackImages(newImageUrls);

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  // IMAGE EDIT
  const handleApprove = async (pageName) => {
    try {
      if (pageName.length === 0 || coverImage.length === 0) {
        return message.error(
          "Xəta baş verdi, Zəhmət olmasa Səhifəni Yeniləyin!"
        );
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      const { data } = await axios.put(
        `https://armariumbackend-production.up.railway.app/backImage/editBackImage/${pageName}`,
        formData
      );
      message.success(data?.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div id="BackGroundChangePage">
      <div className="images">
        {imageUrls.map((e, index) => (
          <div key={index} className="image">
            <h5 className="siteName">{e?.page}</h5>
            <i
              className="fa-regular fa-pen-to-square"
              onClick={() => {
                setSelectedImageIndex(index);
                showModal();
              }}
            ></i>
            {e?.coverImage.slice(0, 4) === "blob" ? (
              <Image src={e?.coverImage} alt={e?.page} />
            ) : (
              <Image
                src={`https://armariumbackend-production.up.railway.app/images/${e?.coverImage}`}
                alt={e?.page}
              />
            )}

            {selectedImageIndex === index ? (
              <div className="buttons">
                <Button
                  type="dashed"
                  loading={loading}
                  onClick={() => handleApprove(e?.page)}
                >
                  Təsdiqlə
                </Button>
                <Button
                  type="dashed"
                  loading={loading}
                  onClick={() => getAllImages()}
                >
                  İmtina et
                </Button>
              </div>
            ) : null}
            <hr />
          </div>
        ))}
      </div>

      <Modal
        open={open}
        title="Arxaplan Şəklini dəyişdir"
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Imtina Et
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={loading}
            onClick={handleOk}
          >
            Demo olaraq Ekranda Göstər
          </Button>,
        ]}
      >
        <input type="file" name="backGroundImage" onChange={handleFileChange} />
      </Modal>
    </div>
  );
};

export default BackGroundChangePage;
