import React, { useEffect, useRef, useState } from "react";
import "./index.scss";
import { Button, Form, Input, Popconfirm, message } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingComponent from "../../components/loading";
import { Editor } from "@tinymce/tinymce-react";

const AddBlogPage = () => {
  const { id } = useParams();
  const [name, setBlogName] = useState("");
  const [description, setBlogDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [loading, setLoading] = useState(true);

  const coverImageRef = useRef(null);

  const editorRef = useRef(null);

  const [sliceCount, setSliceCount] = useState(4);

  const [blogs, setAllBlog] = useState([]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCoverImage(file);
  };

  const getAllBlog = async () => {
    try {
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/blog/getAllBlog`
      );
      setAllBlog(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlog();
  }, []);

  const deleteBlog = async (name) => {
    try {
      setLoading(true);
      const deleteBlog = await axios.delete(
        `https://armariumbackend-production.up.railway.app/blog/deleteBlogByName/${name}/${id}`
      );
      message.success("Blog uğurla silindi");
      getAllBlog();
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = () => {
    message.error("SİLİNMƏDİ");
  };

  const addBlog = async () => {
    try {
      if (
        name.length === 0 ||
        coverImage.length === 0 ||
        description.length === 0
      ) {
        return message.error("Zəhmət olmasa xanaları tam doldurun!");
      }
      setLoading(true);
      const formData = new FormData();
      formData.append("coverImage", coverImage);
      formData.append("name", name);
      formData.append("description", description);
      const { data } = await axios.post(
        `https://armariumbackend-production.up.railway.app/blog/addBlog/${id}`,
        formData
      );
      setBlogName("");
      setCoverImage("");
      setBlogDescription("");
      coverImageRef.current.value = null;
      getAllBlog();
      message.success(data?.message);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="adminBlog">
      {loading ? (
        <LoadingComponent />
      ) : (
        <>
          <h4>BÜTÜN BLOQLAR</h4>
          {blogs.length === 0 ? (
            <>
              <h1>HEÇ BİR BLOQ PAYLAŞMAMISINIZ.</h1>
            </>
          ) : (
            <div className="blogs">
              <>
                {blogs.slice(0, sliceCount).map((e, i) => {
                  return (
                    <div className="blog" key={i}>
                      <img
                        src={`https://armariumbackend-production.up.railway.app/images/${e?.coverImage}`}
                        alt={`${e?.name}`}
                      />

                      <div className="rightText" style={{ width: "100%" }}>
                        <div
                          className="blogHeaderText"
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <h2>{e?.name}</h2>
                          <Popconfirm
                            title="BLOQ"
                            description="Bloq Həmişəlik Silinsin?"
                            onConfirm={() => {
                              deleteBlog(e?.name);
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
                        <div
                          className="description"
                          dangerouslySetInnerHTML={{
                            __html: e?.description?.slice(0, 250),
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}

                <div className="sliceBtn">
                  {blogs?.length > 4 && blogs?.length > sliceCount ? (
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
                        setSliceCount(sliceCount + 4);
                      }}
                    >
                      DAHA ÇOX
                    </button>
                  ) : null}
                </div>
              </>
            </div>
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
        <Form.Item label="Bloqun Adı:">
          <Input
            value={name}
            style={{
              padding: "10px",
              fontWeight: "700",
            }}
            onChange={(e) => {
              setBlogName(e.target.value);
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
            BLOQ-UN ADININ SONUNA `. , ? !` VƏ S. ƏLAVƏ ETMƏYİN
          </p>
        </Form.Item>
        <Form.Item label="Bloq Məlumatı">
          <Editor
            onInit={(evt, editor) => (editorRef.current = editor)}
            value={description}
            onEditorChange={(content, editor) => {
              setBlogDescription(content);
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
              addBlog();
            }}
          >
            Əlavə Et
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddBlogPage;
