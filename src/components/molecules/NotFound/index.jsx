import { Container, } from '@mui/material';
import { Button, Typography } from 'components';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';


const NotFound = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h1" sx={{ fontWeight: 'bold', mb: 4 }} title={"404"} />
      <Typography variant="h6" sx={{ mb: 4 }} title={" Halaman yang Anda cari tidak ditemukan"} />
      <Button variant="contained" component={RouterLink} to="/" size="large" title={"Kembali ke Beranda"} />
    </Container>
  );
}

export default NotFound;
