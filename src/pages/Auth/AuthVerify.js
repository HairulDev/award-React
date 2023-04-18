
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "../../utils/toastProperties";
import API from "configs/axios";
import { Loading } from "components";

const AuthVerify = () => {
  const { token } = useParams();
  const history = useHistory();

  useEffect(() => {
    async function fetchData() {
      await API.get(
        `/v1/auth/verifyReg?token=${token}`
      );
    }
    fetchData();
    history.push("/auth");
    toast.success("Verification successfull", {
      toastProperties
    });
  }, [0]);

  return <div><Loading /></div>;
};

export default AuthVerify;
