import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, } from "react-toastify";
import { Container, } from "@mui/material";

import { DashboardPage, Header, } from "components";


function Dashboard() {

    return (
        <Container spacing={2}>
            <Header />
            <DashboardPage />
        </Container>
    );
}

export default Dashboard