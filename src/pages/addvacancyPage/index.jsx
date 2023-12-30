import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Button, Collapse, Form, Input, Popconfirm, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/loading";
import { Editor } from "@tinymce/tinymce-react";

const AddVacancyPage = () => {
  const { id } = useParams();
  const [name, setVacancyName] = useState("");
  const [description, setVacancyDescription] = useState("");
  const [loading, setLoading] = useState(true);

  const [allVacancies, setAllVacancies] = useState([]);

  const editorRef = useRef(null);

  const getAllVacancies = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/vacancy/allVacancy`
      );
      setAllVacancies(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllVacancies();
  }, []);

  const vacancyDelete = async (name) => {
    try {
      console.log(name);
      const deleteVacancy = await axios.delete(
        `https://armariumbackend-production.up.railway.app/vacancy/deleteVacancyByName/${name}/${id}`
      );
      message.success("vakansiya uğurla silindi");
      getAllVacancies();
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    message.error("SİLİNMƏDİ");
  };

  const addVacancy = async () => {
    try {
      if (name.length === 0 || description.length === 0) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const addData = await axios.post(
        `https://armariumbackend-production.up.railway.app/vacancy/addVacancy/${id}`,
        {
          name,
          description,
        }
      );
      setVacancyName("");
      setVacancyDescription("");
      getAllVacancies();
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const items = allVacancies?.map((data) => ({
    key: data?.id?.toString(),
    label: (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {data?.name}
          <Popconfirm
            title="Vakansiya"
            description="Vakansiya Həmişəlik Silinsin?"
            onConfirm={() => {
              vacancyDelete(data?.name);
            }}
            onCancel={cancel}
            okText="SİL"
            cancelText="BAĞLA"
          >
            {/* <Button danger>Delete</Button> */}
            <i
              className="fa-regular fa-trash-can"
              style={{ color: "red" }}
              // onClick={() => {
              //   vacancyDelete(data?.name);
              // }}
            ></i>
          </Popconfirm>
        </div>
      </>
    ),
    children: (
      <>
        <div
          dangerouslySetInnerHTML={{
            __html: data?.description,
          }}
        ></div>
      </>
    ),
  }));

  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        <div className="activeVacancies">
          <h4>BÜTÜN VAKANSİYALAR</h4>
          {allVacancies.length === 0 ? (
            <h1>VAKANSİYA ƏLAVƏ ETMƏMİŞSİNİZ.</h1>
          ) : (
            <Collapse
              // defaultActiveKey={["1"]}
              accordion
              items={items}
              size="large"
            />
          )}
        </div>
      )}

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 30,
        }}
        layout="vertical"
        initialValues={{
          size: "default",
        }}
        // onValuesChange={onFormLayoutChange}
        size={"default"}
        style={{
          margin: "30px auto",
        }}
      >
        <Form.Item label="Vakansiyanın Adı:">
          <Input
            value={name}
            className="adminAddedInput"
            style={{
              padding: "10px",
              fontWeight: "700",
            }}
            onChange={(e) => {
              setVacancyName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Tələblər: ">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={description}
            onEditorChange={(content, editor) => {
              setVacancyDescription(content);
            }}
            init={{
              height: 500,
              menubar: false,
              plugins: [
                // "a11ychecker",
                // "advlist",
                // "advcode",
                // "advtable",
                // "autolink",
                // "checklist",
                // "export",
                // "lists",
                // "link",
                // "image",
                // "charmap",
                // "preview",
                // "anchor",
                // "searchreplace",
                // "visualblocks",
                // "powerpaste",
                // "fullscreen",
                // "formatpainter",
                // "insertdatetime",
                // "media",
                // "table",
                // "help",
                // "wordcount",
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
        </Form.Item>

        <Form.Item label="Əlavə Edilsin?">
          <Button
            loading={loading}
            onClick={() => {
              addVacancy();
            }}
          >
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVacancyPage;
