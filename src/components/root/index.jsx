import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "../../../layouts/admin/header";

const AdminRoot = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const userID = sessionStorage.getItem("id");

      if (!userID) {
        navigate("/404-notfound");
      } else {
        const { data } = await axios.post(
          "https://armariumbackend-production.up.railway.app/checkAdmin",
          {
            userID: userID,
          },
          {
            withCredentials: true,
          }
        );

        if (!data?.success) {
          sessionStorage.removeItem("id");
          console.log(data?.message);
          navigate("/");
        } else {
          null;
        }
      }
    };

    verifyUser();
  }, [navigate]);

  return (
    <>
{/*       <AdminHeader />
      <Outlet /> */}
      <h1 style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",padding:"0",margin:"0"}}>SAYT BAĞLIDIR.</h1>
    </>
  );
};

export default AdminRoot;
