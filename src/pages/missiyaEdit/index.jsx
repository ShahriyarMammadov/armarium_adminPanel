import { Button, Form, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";

const MissiyaEdit = () => {
  const [loading, setLoading] = useState(false);
  const [mission, setMission] = useState("");

  const getMissionData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/about/getMissiya/6515c18559f571344af26918`
      );
      setMission(data?.data?.about);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMissionData();
  }, []);

  const editMission = async () => {
    try {
      if (mission.length === 0) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const { data } = await axios.put(
        `https://armariumbackend-production.up.railway.app/about/editMIssiya/6515c18559f571344af26918`,
        { about: mission }
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
        <Form.Item label="Missiya: ">
          <TextArea
            value={mission}
            style={{ height: "350px" }}
            onChange={(e) => {
              setMission(e.target.value);
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
              editMission();
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
