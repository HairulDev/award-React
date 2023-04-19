import React from 'react'
import { Card, Container } from '@mui/material';
import CategoryForm from 'components/molecules/CategoryForm';
import { Header } from 'components/organisms';

const CategoryFormPage = () => {
    return (
        <Container spacing={2}>
            <Header />
            <Card sx={{ p: 2 }}>
                <CategoryForm />
            </Card>
        </Container>
    )
}

export default CategoryFormPage