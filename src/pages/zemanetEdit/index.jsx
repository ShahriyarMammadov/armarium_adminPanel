import { Button, Form, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

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
  const editorRef = useRef(null);

  return (
    <div id="haqqimizdaEdit">
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={zemanet}
        onEditorChange={(content, editor) => {
          setZemanet(content);
        }}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "fullscreen",
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
      </Form> */}
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
    </div>
  );
};

export default ZemanetEdit;
