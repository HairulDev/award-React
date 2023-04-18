import { Grid } from '@mui/material'
import React from 'react'
import { Avatar, Typography } from 'components'


const Comment = (props) => {
    const { src, sx, title } = props;

    return (
        <Grid container>
            <Grid item xs={1}>
                <Avatar src={src} sx={sx} />
            </Grid>
            <Grid item xs={11} >
                <Typography sx={{ textAlign: 'left', fontWeight: 'bold' }} gutterBottom variant="subtitle1" title={title[0]} />
                <Typography sx={{ textAlign: 'left', mb: 2, mt: -1 }} gutterBottom variant="subtitle1" title={title[1]} />
            </Grid>
        </Grid>
    )
}

export default Comment