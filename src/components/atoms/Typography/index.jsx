import React from 'react'
import { Typography as Typographys } from "@mui/material";


const Typography = ({ title, ...rest }) => {
    return (
        <Typographys {...rest}>{title}</Typographys>
    )
}

export default Typography