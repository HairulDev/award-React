import { Grid } from '@mui/material'
import React from 'react'
import {
    FacebookShareButton,
    TwitterShareButton,
} from 'react-share';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useLocation } from "react-router-dom";
import env from 'configs/vars';
import { Typography } from 'components';

const Share = (props) => {
    const { title } = props;

    const location = useLocation();
    const url = `${env.publicUrl}${location.pathname}`;


    return (
        <Grid container>
            <Grid item xs={1} sx={{ mr: 2 }} >
                <Typography >Share: </Typography>
            </Grid>
            <Grid item xs={6}>
                <FacebookShareButton url={url}>
                    <FacebookIcon color="primary" />
                </FacebookShareButton>
                <TwitterShareButton url={url} title={title}>
                    <TwitterIcon sx={{ color: "#1f96e9", ml: 1 }} />
                </TwitterShareButton>
            </Grid>
        </Grid>
    )
}

export default Share