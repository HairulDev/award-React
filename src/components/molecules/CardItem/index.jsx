
import React from "react";
import { Box, Card, CardContent, CardMedia, } from "@mui/material";
import convertToRupiah from "utils/formatCurrency";
import { Button, Typography } from "components/atoms";


const CardItem = (props) => {
    const { id, image, title, price, unit, category } = props;
    console.log("image carditem====>", image);

    return (
        <Box component="form" noValidate >
            <Card sx={{ maxWidth: 230, maxHeight: 400, mr: 2, mb: 4, boxShadow: 5 }} key={id} >
                <CardMedia
                    component="img" height="140"
                    image={`https://kalbarvacation.s3.ap-southeast-1.amazonaws.com/item/memberid/${image}`} sx={{ position: 'relative' }} />
                <CardContent>
                    <Typography gutterBottom variant="h6" component="div" title={title} />
                    <Typography variant="body2" title={`${convertToRupiah(price)} / ${unit}`} />
                    <Button style={{ marginTop: 10 }} variant="outlined" color="secondary" title={category} />
                </CardContent>
            </Card >
        </Box >
    )
}

export default CardItem