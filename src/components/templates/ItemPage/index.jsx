import React from 'react'
import { Card } from '@mui/material';
import Item from 'components/molecules/Item';
import { Typography } from 'components/atoms';

const ItemPage = () => {
    return (
        <Card sx={{ p: 2 }}>
            <Typography title="ITEM" variant="h5" sx={{ textAlign: "center" }} />
            <Item />
        </Card >
    )
}

export default ItemPage