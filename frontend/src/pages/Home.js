
import axios from "axios";
import React, { useEffect } from "react";
import Layout from "../components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/user/get-userinfo-by-id",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <Layout>
    <h1>homepage</h1>
    
  </Layout>;
}

export default Home;
