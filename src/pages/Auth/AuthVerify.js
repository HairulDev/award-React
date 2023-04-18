
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../utils/toastProperties";
import axios from "axios";
import env from "configs/vars";
const API = axios.create({ baseURL: env.reactAppHost });

const AuthVerify = () => {
  const { token } = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await API.get(
        `/v1/auth/verifyReg?token=${token}`
      );
      setData(data);
    }
    history.push("/auth");
    fetchData();
    toast.success("Verification successfull", {
      toastProperties
    });
  }, [0]);

  return <div>{data}</div>;
};

export default AuthVerify;
