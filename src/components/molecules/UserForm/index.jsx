import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import React, { useEffect, useState, } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { deleteUser, getUser, } from "store/actions/user";
import env from "configs/vars";
import { Alert, AlertTitle, Button, Snackbar } from "@mui/material";
import API from "configs/axios";

const theme = createTheme();

export default function UserForm() {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');

    const dispatch = useDispatch();
    const history = useHistory();
    const params = useParams();
    const { currentId } = params;

    const { dataUser, } = useSelector((state) => state.userReducer);

    useEffect(() => {
        if (currentId) {
            dispatch(getUser(currentId));
        }
    }, [dispatch, currentId]);

    const deleteUserHandler = async (id) => {
        try {
            try {
                const { data } = await API.delete(`/admin/account/${id}`)
                setMessage(`${data.message}`);
                setOpen(true);
                setTimeout(() => { history.push("/logout") }, 1000)
            } catch (error) {
                throw new Error(error);
            }
        } catch (err) {
            console.error("error handler delete", err);
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        p: 3
                    }}
                >
                    {dataUser ? (
                        <>
                            <Avatar src={dataUser && dataUser.account && dataUser.account.file
                                ? `https://kalbarvacation.s3.ap-southeast-1.amazonaws.com/users/memberid/${dataUser.account.file}`
                                : ''} />

                            <Typography component="h1" variant="subtitle1" color="primary"> {dataUser?.account?.name} </Typography>
                            <Button variant="contained" color="error" onClick={() => deleteUserHandler(currentId)}>Delete Account</Button>
                        </>
                    ) : (
                        ""
                    )}

                </Box>
                {open && (
                    <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
                        <Alert onClose={() => setOpen(false)} severity="success">
                            <AlertTitle>Success</AlertTitle>
                            {message}
                        </Alert>
                    </Snackbar>
                )}

            </Container>
        </ThemeProvider>
    );
}
