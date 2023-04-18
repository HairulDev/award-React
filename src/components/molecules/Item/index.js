import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { getAllItem, delItem } from "store/actions/item";
import { Button, CircularProgress } from "@mui/material";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastProperties } from "utils/toastProperties";

export default function Item() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { dataItemReducerAll } = useSelector((state) => state.itemReducer);
  const [isLoading, setIsLoading] = useState(true);
  const [dataItem, setDataItem] = useState([]);

  useEffect(() => {
    dispatch(getAllItem());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (dataItemReducerAll) {
      setDataItem(dataItemReducerAll.item);
    }
  }, [dataItemReducerAll]);

  console.log("dataItem Item", dataItem);
  console.log("dataItemReducerAll", dataItemReducerAll.item);

  const onDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Apakah Anda yakin akan menghapus data ini?",
      buttons: [
        {
          label: "Ya",
          onClick: () => {
            dispatch(
              delItem(
                id,
                (res) => {
                  const newData = dataItem.filter((data) => data._id !== id);
                  setDataItem(newData);
                  toast.success(res?.message, toastProperties);
                  setIsLoading(false);
                  history.push("/admin/viewItem");
                },
                (error) => {
                  toast.error(
                    error?.response?.message || "Something went wrong",
                    toastProperties
                  );
                  setIsLoading(false);
                  history.push("/admin/viewItem");
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

  const onUpdate = (id) => {
    history.push(`createItem/${id}`);
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
            variant="outlined"
            onClick={() => history.push("/admin/createItem")}
          >
            Create
          </Button>
          <TableContainer component={Paper} style={{ marginTop: 10 }}>
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Kategori</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              {dataItem &&
                dataItem.map((row) => (
                  <TableBody>
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.title}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.price}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.categoryId.name}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {row.city}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        <Button
                          sx={{ m: 1 }}
                          variant="contained"
                          onClick={() => onUpdate(row._id)}
                        >
                          Update
                        </Button>
                        <Button
                          variant="outlined"
                          onClick={() => onDelete(row._id)}
                        >
                          Delete
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
