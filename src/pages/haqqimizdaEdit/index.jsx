import { Button, Form, message } from "antd";
import React, { useEffect, useRef, useState } from "react";
import MissiyaEdit from "../missiyaEdit";
import axios from "axios";
import ZemanetEdit from "../zemanetEdit";
import PointSalesEdit from "../pointSales";
import { Editor } from "@tinymce/tinymce-react";

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
  const editorRef = useRef(null);

  return (
    <>
      <p>Editorun üzərində çıxan bildirişə (This Domain is not registered...) əhəmiyyət verməyin</p>
      <h3>Haqqımızda</h3>
      <div id="haqqimizdaEdit">
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={about}
          onEditorChange={(content, editor) => {
            setAbout(content);
          }}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "a11ychecker",
              "advlist",
              "advcode",
              "advtable",
              "autolink",
              "checklist",
              "export",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "powerpaste",
              "fullscreen",
              "formatpainter",
              "insertdatetime",
              "media",
              "table",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | casechange blocks | fontselect fontsizeselect | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist checklist outdent indent | removeformat | a11ycheck code table help image insertdatetime link anchor | fullscreen visualblocks formatpainter searchreplace | powerpaste charmap",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />

        {/* <Form
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
        </Form> */}

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
      </div>
      <hr />
      <h3>Missiya</h3>
      <MissiyaEdit />
      <hr />
      <h3>Zəmanət</h3>
      <ZemanetEdit />
      <h3>Satış Nöqtələri</h3>
      <PointSalesEdit />
    </>
  );
};

export default HaqqimizdaEdit;
