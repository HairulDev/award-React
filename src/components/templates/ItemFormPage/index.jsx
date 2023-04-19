import React from 'react'
import { Card, Container } from '@mui/material';
import { Header } from 'components/organisms';
import ItemForm from 'components/molecules/ItemForm/create';

const ItemFormPage = () => {
    return (
        <Container spacing={2}>
            <Header />
            <Card sx={{ p: 2 }}>
                <ItemForm />
            </Card>
        </Container>
    )
}

export default ItemFormPage