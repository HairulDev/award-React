import React from "react";
import { Container, } from "@mui/material";

import { Header, } from "components";
import ItemPage from "components/templates/ItemPage";


function Item() {

    return (
        <Container spacing={2}>
            <Header />
            <ItemPage />
        </Container>
    );
}

export default Item