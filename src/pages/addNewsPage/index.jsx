import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Button, Form, Input, Popconfirm, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/loading";
import TextArea from "antd/es/input/TextArea";
import { Editor } from "@tinymce/tinymce-react";

const AddNewsPage = () => {
  const { id } = useParams();
  const [name, setNewsName] = useState("");
  const [description, setNewsDescription] = useState("");
  const [cardDescription, setNewsCardDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(true);

  const coverImageRef = useRef(null);
  const editorRef = useRef(null);

  const [sliceCount, setSliceCount] = useState(6);

  const [news, setAllNews] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const getAllNews = async () => {
    try {
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/news/allNews`
      );
      setAllNews(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  const deleteNews = async (name) => {
    try {
      setLoading(true);
      const deleteBlog = await axios.delete(
        `https://armariumbackend-production.up.railway.app/news/deleteNewsByName/${name}/${id}`
      );
      message.success("Xəbər uğurla silindi");
      getAllNews();
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    message.error("SİLİNMƏDİ");
  };

  const addNews = async () => {
    try {
      if (
        name.length === 0 ||
        coverImage.length === 0 ||
        cardDescription.length === 0 ||
        description.length === 0
      ) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("cardDescription", cardDescription);
      const { data } = await axios.post(
        `https://armariumbackend-production.up.railway.app/news/addNews/${id}`,
        formData
      );

      setCoverImage("");
      setNewsName("");
      setNewsDescription("");
      setNewsCardDescription("");
      coverImageRef.current.value = null;
      getAllNews();
      message.success(data?.message);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="adminNews">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <h4>BÜTÜN XƏBƏRLƏR</h4>
          {news.length === 0 ? (
            <>
              <h1>HEÇ BİR XƏBƏR PAYLAŞMAMIŞSINIZ.</h1>
            </>
          ) : (
            <>
              <div className="cards">
                {news?.slice(0, sliceCount).map((e, i) => {
                  return (
                    <div className="card" key={i}>
                      <div className="image">
                        <img
                          src={`https://armariumbackend-production.up.railway.app/images/${e?.coverImage}`}
                          alt={`${e?.name}`}
                        />
                      </div>
                      <div className="text">
                        <div
                          className="headerText"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h5>{e?.name}</h5>
                          <Popconfirm
                            title="XƏBƏRLƏR"
                            description="Xəbər Həmişəlik Silinsin?"
                            onConfirm={() => {
                              deleteNews(e?._id);
                            }}
                            onCancel={cancel}
                            okText="SİL"
                            cancelText="BAĞLA"
                          >
                            <i
                              className="fa-regular fa-trash-can"
                              style={{
                                color: "red",
                                cursor: "pointer",
                                fontSize: "24px",
                              }}
                            ></i>
                          </Popconfirm>
                        </div>
                        <div className="date">
                          <i className="fa-regular fa-calendar-days"></i>{" "}
                          {e?.date?.slice(0, 10)}
                        </div>
                        <hr />

                        <div className="detailTextSlice">
                          <p>
                            {" "}
                            {e?.cardDescription
                              ?.slice(0, 50)
                              ?.split("<br />")
                              ?.map((line, lineIndex) => (
                                <React.Fragment key={lineIndex}>
                                  {line}. . .
                                  <br />
                                </React.Fragment>
                              ))}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {news?.length > 6 && news?.length > sliceCount ? (
                <button
                  style={{
                    display: "block",
                    margin: "0 auto",
                    marginBottom: "20px",
                    padding: "10px 15px",
                    cursor: "pointer",
                    fontWeight: "700",
                  }}
                  onClick={() => {
                    setSliceCount(sliceCount + 6);
                  }}
                >
                  DAHA ÇOX
                </button>
              ) : null}
            </>
          )}
        </>
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
          margin: "0 auto",
        }}
      >
        <Form.Item label="Xəbərin Adı:">
          <Input
            value={name}
            style={{
              padding: "10px",
              fontWeight: "700",
            }}
            onChange={(e) => {
              setNewsName(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Qısa Məlumat: (50)">
          <TextArea
            showCount
            maxLength={50}
            value={cardDescription}
            onChange={(e) => {
              setNewsCardDescription(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Ətraflı Məlumat: ">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={description}
            onEditorChange={(content, editor) => {
              setNewsDescription(content);
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
        <Form.Item label="Örtük Şəkli: ">
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
              addNews();
            }}
          >
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddNewsPage;
