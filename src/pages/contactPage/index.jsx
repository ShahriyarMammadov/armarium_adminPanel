import React, { useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import LoadingComponent from "../../components/loading";
import { Avatar, List, Radio, Space } from "antd";

const ContactPage = () => {
  const [contactMe, setContactMe] = useState([]);
  const [writeToUs, setWriteToUs] = useState([]);
  const [sliceCount, setSliceCount] = useState(5);
  const [sliceCountTel, setsliceCountTel] = useState(5);

  const data = [
    {
      title: "Ant Design Title 1",
    },
    {
      title: "Ant Design Title 2",
    },
    {
      title: "Ant Design Title 3",
    },
    {
      title: "Ant Design Title 4",
    },
  ];

  const [position, setPosition] = useState("bottom");
  const [align, setAlign] = useState("center");

  const positionOptions = ["top", "bottom", "both"];
  const alignOptions = ["start", "center", "end"];

  const [loading, setLoading] = useState(true);

  const getContactMe = async () => {
    try {
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/contactMe/getContactMe`
      );
      setContactMe(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWriteToUs = async () => {
    try {
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/writeToUs/allWriteToUs`
      );
      setWriteToUs(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getContactMe();
    getWriteToUs();
  }, []);

  return (
    <div id="contactPage">
      <div id="contacts">
        <h4>TELEFON NÖMRƏSİ YAZANLAR</h4>

        {loading ? (
          <LoadingComponent />
        ) : contactMe.length == 0 ? (
          <h3>TELEFON NÖMRƏSİ YAZILMIYIB.</h3>
        ) : (
          <List
            pagination={{
              position,
              align,
            }}
            dataSource={contactMe}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={<a href={`mailto:${item?.email}`}>{item?.email}</a>}
                  description={
                    <>
                      <span style={{ fontWeight: "700" }}>
                        Telefon Nömrəsi:{" "}
                      </span>{" "}
                      <a
                        href={`tel:${item?.phoneNumber}`}
                        style={{ color: "black" }}
                      >
                        {item?.phoneNumber}
                      </a>
                      <br />
                      <span style={{ fontWeight: "700" }}>Tarix: </span>{" "}
                      {item?.date}
                      <br />
                    </>
                  }
                />
              </List.Item>
            )}
          />
        )}
      </div>

      <hr />

      <div id="writeToUs">
        <h4>MESAJ YAZANLAR</h4>

        {loading ? (
          <LoadingComponent />
        ) : writeToUs.length == 0 ? (
          <h3>MESAJ YAZILMAYIB.</h3>
        ) : (
          <>
            <List
              pagination={{
                position,
                align,
              }}
              dataSource={writeToUs}
              renderItem={(item, index) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<a href={`mailto:${item?.email}`}>{item?.email}</a>}
                    description={
                      <>
                        <span style={{ fontWeight: "700" }}>Ad və Soyad:</span>{" "}
                        {item?.fullName}
                        <br />
                        {item?.text}
                        <br />
                        <span style={{ fontWeight: "700" }}>
                          Telefon Nömrəsi:{" "}
                        </span>
                        {item?.phoneNumber}
                        <br />
                        <span style={{ fontWeight: "700" }}>Tarix: </span>{" "}
                        {item?.date}
                      </>
                    }
                  />
                </List.Item>
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
