import { Button, Form } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const MissiyaEdit = () => {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");

  const editAbout = async () => {
    try {
      if (about.length === 0) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("about", about);
      const { data } = await axios.post(
        `https://armariumbackend-production.up.railway.app/blog/addBlog/${id}`,
        formData
      );
      setLoading(false);
      message.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="haqqimizdaEdit">
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
        size={"default"}
        style={{
          margin: "0 auto",
        }}
      >
        <Form.Item label="Missiya: ">
          <TextArea
            value={about}
            style={{ height: "350px" }}
            onChange={(e) => {
              setAbout(e.target.value);
            }}
          />
          <p
            style={{
              color: "red",
              fontSize: "12px",
              margin: "0",
              fontWeight: "900",
            }}
          >
            CÜMLƏNİN YENİ SƏTİRDƏN BAŞLAMASI ÜÇÜN ƏVVƏLKİ CÜMLƏNİN SONUNA{" "}
            {`<br />`} ƏLAVƏ EDİN
          </p>
        </Form.Item>

        <Form.Item label="Əlavə Edilsin?">
          <Button
            loading={loading}
            onClick={() => {
              editAbout();
            }}
          >
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MissiyaEdit;
