import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

const ZemanetEdit = () => {
  const [loading, setLoading] = useState(false);
  const [zemanet, setZemanet] = useState("");

  const getZemanetData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/about/getZemanet/651674b81222f3e734ae9f72`
      );
      setZemanet(data?.data?.about);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getZemanetData();
  }, []);

  const editZemanet = async () => {
    try {
      if (zemanet.length === 0) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const { data } = await axios.put(
        `https://armariumbackend-production.up.railway.app/about/editZemanet/651674b81222f3e734ae9f72`,
        { about: zemanet }
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
          span: 20,
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
        <Form.Item label="Zəmanət: ">
          <TextArea
            value={zemanet}
            style={{ height: "350px" }}
            onChange={(e) => {
              setZemanet(e.target.value);
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
              editZemanet();
            }}
          >
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ZemanetEdit;
