import React from 'react';
import Buttons from "@mui/material/Button";

const Button = ({ title, ...rest }) => {

    return (
        <Buttons {...rest}>{title}</Buttons>
    )
}

export default Button