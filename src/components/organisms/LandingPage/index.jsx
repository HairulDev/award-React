import React, { useState, useEffect, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import { useLocation } from 'react-router-dom';
import { CardItem, Categories } from "components/molecules";
import { getAllItem } from "store/actions/item";
import { Button, Card, Container, Grid } from "@mui/material";
import env from "configs/vars";
import Paginate from "components/molecules/Pagination";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LandingPage() {
  const user = JSON.parse(localStorage.getItem("profile"));
  const dispatch = useDispatch();

  const location = useLocation();
  const searchPath = location.pathname;
  const query = useQuery();
  const page = query.get('page') || 1;

  const { dataItemReducerAll } = useSelector((state) => state.itemReducer);

  useEffect(() => {
    dispatch(getAllItem(page));
  }, [dispatch, page]);

  const history = useHistory();
  useEffect(() => {
    if (!user?.result)
      history.push("/auth");
  }, [0]);


  return (
    <Container fixed sx={{ p: 2 }} maxWidth="sm">
      <Card >
        <Grid item xs={12} sx={{ p: 2, }}>
          {searchPath === '/search' && (
            <Button variant="outlined" color="primary" href="/">Back</Button>
          )}
        </Grid>
        <Grid container sx={{ justifyContent: "center" }}>
          {
            dataItemReducerAll.item ? (
              dataItemReducerAll.item.map((item) => (
                <CardItem
                  id={item._id}
                  image={item.imageId.imageUrl}
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
        {searchPath !== "/search" && (
          <Paginate currentPage={dataItemReducerAll.currentPage} numberOfPages={dataItemReducerAll.numberOfPages} />
        )}
      </Card>
    </Container>
  );
}

export default LandingPage