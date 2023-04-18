import React from 'react'
import {
    InputBase,
} from "@mui/material";

import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme, border }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: border ? border : 'none',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: 'auto',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(1)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const SearchInput = (props) => {
    const { onKeyDown, onChange, value, autoComplete, name,
        placeholder, inputProps, endAdornment, border
    } = props;

    return (
        <Search border={border}>
            <StyledInputBase
                onKeyDown={onKeyDown}
                onChange={onChange}
                value={value}
                autoComplete={autoComplete}
                name={name}
                placeholder={placeholder}
                inputProps={inputProps}
                endAdornment={endAdornment}
            />
        </Search>
    )
}

export default SearchInput