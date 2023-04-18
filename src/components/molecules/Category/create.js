import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

import {
  createCategory,
  getCategory,
  updateCategory,
} from "store/actions/category";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Card } from "@mui/material";
import { toastProperties } from "utils/toastProperties";

const theme = createTheme();

export default function Create() {
  const initialState = {
    _id: "",
    name: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { currentId } = params;
  const [isCreate, setIsCreate] = useState(true);

  const [form, setForm] = useState(initialState);
  const { dataCategoryReducer } = useSelector((state) => state.categoryReducer);
  const { _id, name } = form;

  useEffect(() => {
    if (currentId) {
      dispatch(getCategory(currentId));
      setIsCreate(false);
    }
  }, [dispatch]);

  useEffect(() => {
    setForm(dataCategoryReducer);
  }, [dataCategoryReducer]);

  console.log("form", form);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      dispatch(
        createCategory(
          form,
          (res) => {
            toast.success(res?.message, toastProperties);
            history.push("viewCategory");
          },
          (error) => {
            toast.error(
              error?.response?.message || "Something went wrong",
              toastProperties
            );
          }
        )
      );
    } else {
      dispatch(
        updateCategory(
          { _id, name },
          (res) => {
            toast.success(res?.message, toastProperties);
            history.push("/admin/viewCategory");
          },
          (error) => {
            toast.error(
              error?.response?.message || "Something went wrong",
              toastProperties
            );
          }
        )
      );
    }
  }; // end handleSubmit

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card
            variant="outlined"
            sx={{
              padding: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isCreate ? "Create Category" : "Update Category"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={onChange}
                    value={name}
                    name="name"
                    required
                    fullWidth
                    label="Category Name"
                    autoFocus
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  onChange={onChange}
                  value={_id}
                  name="_id"
                  hidden
                  required
                  fullWidth
                />
              </Grid>

              <Button
                onClick={handleSubmit}
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {isCreate ? "Create" : "Update"}
              </Button>
            </Box>
          </Card>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
