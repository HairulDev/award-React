
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../utils/toastProperties";
import axios from "axios";
import env from "configs/vars";
import { Loading } from "components";
const API = axios.create({ baseURL: env.reactAppHost });

const AuthVerify = () => {
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await API.get(
        `/v1/auth/verifyReg?token=${token}`
      );
    }
    history.push("/auth");
    fetchData();
    toast.success("Verification successfull", {
      toastProperties
    });
  }, [0]);

  return <div><Loading /></div>;
};

export default AuthVerify;
