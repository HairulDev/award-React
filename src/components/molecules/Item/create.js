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

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  FormControl,
  InputLabel,
  NativeSelect,
} from "@mui/material";
import { toastProperties } from "utils/toastProperties";

import {
  createItem,
  getAllItem,
  getItem,
  updateItem,
} from "store/actions/item";

const theme = createTheme();

export default function Create() {
  const initialState = {
    _id: "",
    title: "",
    price: "",
    city: "",
    description: "",
  };
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { currentId } = params;
  const [isCreate, setIsCreate] = useState(true);

  const { dataItemReducer } = useSelector((state) => state.itemReducer);
  const { dataItemReducerAll } = useSelector((state) => state.itemReducer);

  const [form, setForm] = useState(initialState);
  const [dataCategory, setDataCategory] = useState([]);

  const [fileName, setFileName] = useState();

  useEffect(() => {
    if (currentId) {
      dispatch(getItem(currentId));
      setIsCreate(false);
    } else {
      dispatch(getAllItem());
    }
  }, [dispatch]);

  useEffect(() => {
    if (currentId) {
      if (dataItemReducer) {
        setForm(dataItemReducer.item);
        setDataCategory(dataItemReducer.category);
      }
    }
  }, [dataItemReducer]);

  useEffect(() => {
    setDataCategory(dataItemReducerAll.category);
  }, [dataItemReducerAll]);

  const categId =
    dataCategory && dataCategory.find((el) => el._id === form?.categoryId?._id);

  const onChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onChangeFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, [e.target.name]: file });
    setFileName(file.name);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!currentId) {
      console.log("masuk ke insert");
      dispatch(
        createItem(
          form,
          (res) => {
            toast.success(res?.message, toastProperties);
            history.push("viewItem");
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
        updateItem(
          currentId,
          {
            title: form?.title,
            price: form?.price,
            city: form?.city,
            categoryId: form?.categoryId,
            file: form?.file,
            description: form?.description,
          },
          (res) => {
            toast.success(res?.message, toastProperties);
            history.push("/admin/viewItem");
          },
          (error) => {
            toast.error(
              error?.message || "Something went wrong",
              toastProperties
            );
          }
        )
      );
    }
  }; // end handleSubmit

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
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
              {isCreate ? "Create Item" : "Update Item"}
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
              autoComplete="on"
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={onChange}
                    value={form?.title}
                    name="title"
                    required
                    fullWidth
                    label="Title"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={onChange}
                    value={form?.price}
                    name="price"
                    required
                    fullWidth
                    label="Price"
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={onChange}
                    value={form?.city}
                    name="city"
                    required
                    fullWidth
                    label="City"
                  />
                </Grid>

                <Grid item xs={12} sm={12}>
                  <FormControl size="small" fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Category
                    </InputLabel>
                    <NativeSelect
                      required
                      id="categoryId"
                      name="categoryId"
                      label="Category"
                      labelId="demo-simple-select-label"
                      onChange={onChange}
                      value={categId?._id}
                    >
                      {dataCategory &&
                        dataCategory.map((e) => {
                          return <option value={e._id}>{e.name}</option>;
                        })}
                    </NativeSelect>
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <Button
                    sx={{
                      zIndex: 1,
                      marginTop: "-1px",
                      paddingTop: "8px",
                      paddingBottom: "9px",
                    }}
                    variant="contained"
                    component="label"
                  >
                    Browse
                    <input
                      type="file"
                      name="file"
                      hidden
                      onChange={onChangeFile}
                    />
                  </Button>
                  <TextField
                    inputProps={{ style: { textAlign: "center" } }}
                    disabled
                    size="small"
                    sx={{ marginLeft: "-2rem", border: "none" }}
                    onChange={onChangeFile}
                    value={fileName}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    sx={{
                      "& .MuiTextField-root": { minWidth: 170 },
                    }}
                    onChange={onChange}
                    value={form?.description}
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    onChange={onChange}
                    value={form?._id}
                    name="_id"
                    hidden
                    required
                    fullWidth
                  />
                </Grid>
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
