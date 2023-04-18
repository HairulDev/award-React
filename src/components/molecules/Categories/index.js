
import React from 'react';
import env from "configs/vars";
import { CardItem, } from "components";
import {
  Card, Container, Grid,
} from "@mui/material";
import PropTypes from 'prop-types';
import Paginate from '../Pagination';

export default function Categories({ data }) {
  const { currentPage, numberOfPages, item } = data;

  return (
    <Container fixed sx={{ pb: 3, pt: 3 }}>
      <Card sx={{ pt: 2 }}>
        <Grid container sx={{ justifyContent: "center" }}>
          {
            item ? (
              item.map((item, index) => (
                <CardItem
                  key={index}
                  _id={item._id}
                  image={
                    item.imageId
                      ? `${env.reactAppHost}/images/items/${item.imageId.imageUrl}`
                      : ""
                  }
                  title={item.title}
                  price={item.price}
                  unit={item.unit}
                  category={item.categoryId.name}
                />
              ))
            ) : (
              "No Awards Found"
            )
          }
        </Grid>
      </Card>
      <Paginate currentPage={currentPage} numberOfPages={numberOfPages} />
    </Container>
  );
}

Categories.propTypes = {
  data: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    numberOfPages: PropTypes.number.isRequired,
    item: PropTypes.array.isRequired,
  }).isRequired,
};
