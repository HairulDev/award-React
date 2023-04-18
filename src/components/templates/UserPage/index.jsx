import * as React from 'react';
import Box from '@mui/material/Box';
import { UserForm } from "components/molecules";
import { useState } from 'react';

const UserPage = () => {

  return (
    <Box sx={{ width: '100%' }}>
      <UserForm />
    </Box>

  );
}

export default UserPage