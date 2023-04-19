import React from 'react'
import Category from 'components/molecules/Category';
import { Card } from '@mui/material';
import { Typography } from 'components/atoms';

const CategoryPage = () => {
    return (
        <Card sx={{ p: 2 }}>
            <Typography title="CATEGORY" variant="h5" sx={{ textAlign: "center" }} />
            <Category />
        </Card>
    )
}

export default CategoryPage