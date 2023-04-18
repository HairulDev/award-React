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

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function LandingPage() {
  const user = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const location = useLocation();
  const searchPath = location.pathname;
  const query = useQuery();
  const searchQuery = useParams;
  const page = query.get('page') || 1;

  const { dataItemReducerAll } = useSelector((state) => state.itemReducer);
  console.log("dataItemReducerAll", dataItemReducerAll);

  useEffect(() => {
    dispatch(getAllItem(page));
  }, [dispatch, page]);


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
                  image={`${env.reactAppHost}/images/items/${item.imageId.imageUrl}`}
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