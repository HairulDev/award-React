import React from 'react';
import { TextField, FormHelperText, Grid, InputAdornment, IconButton } from '@mui/material';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Input = ({ name, value, onChange, label, half, autoFocus, type, helperText, error, handleShowPassword, featureShowPassword, isLogin }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={featureShowPassword === true || isLogin === true ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              {type === 'password' ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
    <FormHelperText
      error={error}>
      {helperText}
    </FormHelperText>
  </Grid>
);

export default Input;
