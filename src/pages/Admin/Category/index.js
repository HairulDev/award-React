import React from "react";
import { Container, } from "@mui/material";

import { Header, } from "components";
import CategoryPage from "components/templates/CategoryPage";


function Category() {

    return (
        <Container spacing={2}>
            <Header />
            <CategoryPage />
        </Container>
    );
}

export default Category