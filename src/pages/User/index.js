import React from "react";
import { useSelector } from "react-redux";
import { ToastContainer, } from "react-toastify";
import { Card, Container, } from "@mui/material";

import { UserPage, Header, } from "components";


function User() {

    return (
        <Container spacing={2}>
            <Header />
            <Card>
                <UserPage />
            </Card>
        </Container>
    );
}

export default User