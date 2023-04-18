/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Container, Pagination, PaginationItem, Stack } from '@mui/material';


const Paginate = ({ currentPage, numberOfPages }) => {

    return (
        <Container>
            <Stack
                spacing={2}
                sx={{
                    justifyContent: "center",
                    display: "flex",
                    alignItems: "center",
                    height: "100%",
                    p: 2
                }}>
                <Pagination
                    count={numberOfPages}
                    page={Number(currentPage) || 1}
                    color="primary"
                    renderItem={(item) => (
                        <PaginationItem {...item} component={Link} to={`/?page=${item.page}`} />
                    )}
                />
            </Stack>
        </Container>
    );
};

export default Paginate;
