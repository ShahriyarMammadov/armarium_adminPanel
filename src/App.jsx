import { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Router from "./routes";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      const userID = sessionStorage.getItem("id");

      if (!userID) {
        navigate("/");
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
      <Router />
    </>
  );
}

export default App;
