import React, { useEffect, useState } from "react";
import { Button, Select, message } from "antd";
import axios from "axios";
import { Input } from "antd";

const PointSalesEdit = () => {
  const [data, setData] = useState([]);
  const { TextArea } = Input;
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [saat, setSaat] = useState("");
  const [defaultValue, setDefaultValue] = useState([]);
  const [loading, setLoading] = useState(false);

  //   let defaultValue = [];

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://armariumbackend-production.up.railway.app/salesPoint/allSalesPoint`
      );
      setData(data);

      data?.forEach((e) => {
        setAddress(e?.address);
        setContactPerson(e?.contactPerson);
        setEmail(e?.email);
        setPhoneNumber(e?.phoneNumber);
        setSaat(e?.saat);

        e?.gosterilenXidmetler?.forEach((e) => {
          defaultValue.push(e);
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(address, contactPerson, phoneNumber, email, saat);
  console.log(defaultValue);

  const editSalesPointData = async (id) => {
    try {
      setLoading(true);
      //   const defaultValueArray = defaultValue
      //     .split(",")
      //     .map((item) => item.trim());

      if (Array.isArray(defaultValue)) {
        var defaultValueArray = defaultValue;
      } else {
        var defaultValueArray = defaultValue
          .split(",")
          .map((item) => item.trim());
      }

      const { data } = await axios.patch(
        `https://armariumbackend-production.up.railway.app/salesPoint/editSalesPoint/${id}`,
        {
          address: address,
          contactPerson: contactPerson,
          phoneNumber: phoneNumber,
          email: email,
          saat: saat,
          gosterilenXidmetler: defaultValueArray,
        }
      );
      setLoading(false);
      message.success(data.message);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div>
      <p>Göstərilən Xidmətlər</p>

      <p>Əlaqə Məlumatlar</p>
      {data?.map((e, i) => {
        return (
          <>
            <TextArea
              value={defaultValue}
              onChange={(e) => {
                setDefaultValue(e.target.value);
              }}
              placeholder="Ünvan Məlumatları"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
            <p>İş Saatları: </p>
            <Input
              placeholder="İş Saatları"
              value={saat}
              onChange={(e) => {
                setSaat(e.target.value);
              }}
            />
            <p>Ünvan Məlumatları: </p>
            <TextArea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Ünvan Məlumatları"
              autoSize={{
                minRows: 3,
                maxRows: 5,
              }}
            />
            <p>Telefon: </p>
            <Input
              placeholder="Telefon"
              value={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
            <p>Email: </p>
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <p>Əlaqədar Şəxs: </p>
            <Input
              placeholder="Əlaqədar Şəxs"
              value={contactPerson}
              onChange={(e) => {
                setContactPerson(e.target.value);
              }}
            />
            <Button
              type={"dashed"}
              style={{
                marginTop: "20px",
              }}
              loading={loading}
              onClick={() => {
                editSalesPointData(e._id);
              }}
            >
              Dəyiş
            </Button>
          </>
        );
      })}
    </div>
  );
};

export default PointSalesEdit;
