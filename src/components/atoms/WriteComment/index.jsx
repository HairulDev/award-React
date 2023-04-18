import { Grid } from '@mui/material'
import React from 'react'
import { Avatar, } from 'components'


const WriteComment = (props) => {
    const { onSubmit, src, sx, value, onChange, disabled } = props;

    return (
        <Grid container>
            <Grid item xs={1}>
                <Avatar src={src} sx={sx[0]} />
            </Grid>
            <Grid item xs={11} >
                <form onSubmit={onSubmit}>
                    <input
                        style={sx[1]}
                        placeholder="Tulis penilaian"
                        value={value}
                        onChange={onChange}
                        disabled={disabled}
                    />
                </form>
            </Grid>
        </Grid>
    )
}

export default WriteComment