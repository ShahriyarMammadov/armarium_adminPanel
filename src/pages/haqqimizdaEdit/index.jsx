import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import MissiyaEdit from "../missiyaEdit";
import axios from "axios";
import ZemanetEdit from "../zemanetEdit";

const HaqqimizdaEdit = () => {
  const [loading, setLoading] = useState(false);
  const [about, setAbout] = useState("");

  const getAboutData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/about/getHaqqimizda/6515be22e9d3dcf856ed1311`
      );
      setAbout(data?.data?.about);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAboutData();
  }, []);

  const editAbout = async () => {
    try {
      if (about.length === 0) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const { data } = await axios.put(
        `https://armariumbackend-production.up.railway.app/about/editHaqqimizda/6515be22e9d3dcf856ed1311`,
        { about: about }
      );
      setLoading(false);
      message.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h3>Haqqımızda</h3>
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
          <Form.Item label="Haqqımızda: ">
            <TextArea
              disabled={loading}
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
      <hr />
      <h3>Missiya</h3>
      <MissiyaEdit />
      <hr />
      <h3>Zəmanət</h3>
      <ZemanetEdit />
    </>
  );
};

export default HaqqimizdaEdit;
