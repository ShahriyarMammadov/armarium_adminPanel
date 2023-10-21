import { Button, Form, message } from "antd";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";

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

  const editorRef = useRef(null);

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
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={mission}
        onEditorChange={(content, editor) => {
          setMission(content);
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
      </Form> */}

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
    </div>
  );
};

export default MissiyaEdit;
