import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getAllCategories, delCategory } from "store/actions/category";
import { Button, CircularProgress } from "@mui/material";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "utils/toastProperties";

export default function Category() {
  const dispatch = useDispatch();
  const { dataCategoryReducer } = useSelector((state) => state.categoryReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [dataCategory, setDataCategory] = useState([]);
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllCategories());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (dataCategoryReducer.length > 0) {
      setDataCategory(dataCategoryReducer);
    }
  }, [dataCategoryReducer]);
  console.log("dataCategoryReducer===>>", dataCategoryReducer);

  const onUpdate = (id) => {
    history.replace(`/admin/createCategory/${id}`);
  };

  const onDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Apakah Anda yakin akan menghapus data ini?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            dispatch(
              delCategory(
                id,
                (res) => {
                  const newData = dataCategory.filter(
                    (data) => data._id !== id
                  );
                  setDataCategory(newData);
                  toast.success(res?.message, toastProperties);
                  setIsLoading(false);
                  history.replace("/admin/viewCategory");
                },
                (error) => {
                  toast.error(
                    error?.response?.message || "Something went wrong",
                    toastProperties
                  );
                  setIsLoading(false);
                  history.replace("/admin/viewCategory");
                }
              )
            );
          },
        },
        {
          label: "Tidak",
          onClick: () => console.log("user tidak setuju"),
        },
      ],
    });
  };

  return (
    <>
      {isLoading ? (
        <>
          <CircularProgress />
        </>
      ) : (
        <>
          <Button
            variant="contained"
            onClick={() => history.replace("/admin/createCategory")}
          >
            Create
          </Button>
          <TableContainer component={Paper} style={{ marginTop: 10 }}>
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Category</TableCell>
                  <TableCell>Tools</TableCell>
                </TableRow>
              </TableHead>
              {dataCategory.map((row) => (
                <TableBody>
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Button
                        sx={{ m: 1 }}
                        variant="outlined"
                        onClick={() => onDelete(row._id)}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => onUpdate(row._id)}
                      >
                        Update
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              ))}
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
