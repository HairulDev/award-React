import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import {
  AppBar as MuiAppBar, Box, Button, CardMedia, Checkbox, Chip, CssBaseline, Divider,
  Drawer, FormControlLabel, FormGroup, IconButton, Link, List, ListItem, ListItemButton,
  ListItemText, Slider, Toolbar, Typography
} from "@mui/material";
import FilterListIcon from '@mui/icons-material/FilterList';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import icon from "../../../assets/images/icon.png";

import { filterHistorySave, getItemBySearch } from 'store/actions/item';
import convertToRupiah from 'utils/formatCurrency';
import env from 'configs/vars';

const ListItemChip = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));


function DrawerAppBar(props) {

  const { authData } = useSelector((state) => state.auth);
  const { filterHistory } = useSelector((state) => state.itemReducer);
  const navItems = [{
    name: 'Home',
    url: `${env.publicUrl}`
  },
  {
    name: 'Cards',
    url: `${env.publicUrl}/cards`
  },
  {
    name: 'Profile',
    url: `${env.publicUrl}/account/${authData?.result._id}`
  },
  {
    name: 'Logout',
    url: `${env.publicUrl}/logout`
  }];

  const maxPrice = 500000;
  const startPoint = filterHistory.value;
  const initialsBoxStatesStore = filterHistory.checkboxStates;
  const initialsBoxStates = {
    allTypeChecked: false,
    vouchersChecked: false,
    productsChecked: false,
    giftcardChecked: false,
  }
  const initialsBoxStatesAll = { ...initialsBoxStates, ...initialsBoxStatesStore }
  const { window } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileOpen2, setMobileOpen2] = useState(false);
  const [value, setValue] = useState([startPoint]);
  const [checkboxStates, setCheckboxStates] = useState({ ...initialsBoxStatesAll });
  const { giftcardChecked, productsChecked, vouchersChecked } = checkboxStates;

  const [chipData, setChipData] = useState([]);
  const [disabledHandleDelete, setDisabledHandleDelete] = useState(false);
  console.log("checkboxStates====>>", checkboxStates);

  const handleChecked = (value, label) => {
    if (chipData.find((chip) => chip.key === value)) {
      setChipData((prev) => prev.filter((chip) => chip.key !== value));
    } else {
      setChipData((prev) => [...prev, { key: value, label }]);
    }
  };

  const handleAllTypeChange = (event) => {
    const checked = event.target.checked;
    setCheckboxStates({
      allTypeChecked: checked,
      vouchersChecked: checked,
      productsChecked: checked,
      giftcardChecked: checked,
    });
    if (checked) {
      handleChecked(1, "Vouchers");
      handleChecked(2, "Products");
      handleChecked(3, "Giftcard");
      setDisabledHandleDelete(true);
    } else {
      setChipData([]);
      setDisabledHandleDelete(false);
    }
  };

  useEffect(() => {
    if (checkboxStates.giftcardChecked === true) {
      handleChecked(3, "Giftcard");
    } if (checkboxStates.productsChecked === true) {
      handleChecked(2, "Products");
    } if (checkboxStates.vouchersChecked === true) {
      handleChecked(1, "Vouchers");
    }
  }, []);

  const handleVouchersChange = (event) => {
    const checked = event.target.checked;
    setCheckboxStates((prev) => ({ ...prev, vouchersChecked: checked }));
    handleChecked(1, "Vouchers");
  };

  const handleProductsChange = (event) => {
    const checked = event.target.checked;
    setCheckboxStates((prev) => ({ ...prev, productsChecked: checked }));
    handleChecked(2, "Products");
  };

  const handleGiftcardChange = (event) => {
    const checked = event.target.checked;
    setCheckboxStates((prev) => ({ ...prev, giftcardChecked: checked }));
    handleChecked(3, "Giftcard");
  };

  const handleDelete = (chipToDelete) => () => {
    if (!disabledHandleDelete) {
      setChipData((chips) => chips.filter((chip) => chip.key !== chipToDelete.key));
    } else {
      return;
    }
    switch (chipToDelete.label) {
      case "Vouchers":
        setCheckboxStates((prev) => ({ ...prev, vouchersChecked: false }));
        break;
      case "Products":
        setCheckboxStates((prev) => ({ ...prev, productsChecked: false }));
        break;
      case "Giftcard":
        setCheckboxStates((prev) => ({ ...prev, giftcardChecked: false }));
        break;
      default:
        break;
    }
  };
  const handleDeletePoint = () => {
    setValue(startPoint);
  }

  const filterHandler = () => {
    let types = [];
    chipData.map((chip) => {
      types.push(chip.label)
    });
    dispatch(getItemBySearch(types, value))
    dispatch(filterHistorySave(value, checkboxStates))
    history.push(`/search`);
  }
  // console.log("filterHistory======>>>", filterHistory);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    if (newValue <= 10000) {
      setValue(10000);
    }
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const handleDrawerToggle2 = () => {
    setMobileOpen2((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ textAlign: "left", pl: 2, }}>
        <CardMedia component="img" style={{ width: "30%", height: "auto", }} image={icon} />
        <Typography variant="h6">Awards Menu</Typography>
      </Box>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton href={item.url} sx={{ textAlign: 'left', textDecoration: "none", }}>
              <ListItemText primary={item.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const drawer2 = (
    <Box sx={{ textAlign: 'center' }}>
      <Box sx={{ textAlign: "left", p: 2, }}>
        <Box sx={{ display: 'flex', mb: 3 }}>
          <Typography variant="h5" fontWeight="bold">Filter</Typography>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          </Typography>
          <CloseIcon onClick={() => handleDrawerToggle2(false)}
            sx={{ textAlign: "right" }}>Tutup</CloseIcon>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', }} >
          <Typography sx={{ display: 'flex', textAlign: "left", alignItems: 'center', mr: 1, }}
            color="primary">Poin : </Typography>
          <Chip label={convertToRupiah(value)} onDelete={handleDeletePoint} />
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', }} >
          <Typography sx={{ display: 'flex', textAlign: "left", alignItems: 'center', mr: 1, }}
            color="primary">Type :</Typography>
          {chipData.map((data) => {
            return (
              <ListItemChip sx={{
              }} key={data.key}>
                <Chip
                  label={data.label}
                  onDelete={handleDelete(data)}
                />
              </ListItemChip>
            );
          })}
        </Box>
        <Button variant="outlined" color="primary"
          sx={{ textTransform: 'none', mt: 1, px: 1, py: 0.5, }}
          onClick={() => {
            handleDeletePoint();
            setChipData([]);
            setValue(10000);
            setCheckboxStates({ ...initialsBoxStates });
            setDisabledHandleDelete(false);
          }
          }>
          Clear All Filter
        </Button>
        <Box sx={{ mt: 3 }}>
          <Typography variant="body1" fontWeight="bold">Poin Needed</Typography>
          <Box sx={{ display: 'flex', }}>
            <Typography variant="body1" fontWeight="bold" color="primary">IDR 10.000</Typography>
            <Typography noWrap sx={{ flexGrow: 1 }} component="div"></Typography>
            <Typography variant="body1" fontWeight="bold" color="primary">IDR {convertToRupiah(value)}</Typography>
          </Box>
          <Slider
            value={value}
            onChange={handleSliderChange}
            valueLabelDisplay="auto"
            max={maxPrice}
          />
        </Box>
      </Box>
      <Box sx={{ textAlign: "left", p: 2, }}>
        <Typography variant="body1" fontWeight="bold">Awards Type</Typography>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox onChange={handleAllTypeChange} />}
            label="All Type"
            checked={checkboxStates.allTypeChecked}
          />
          <FormControlLabel
            control={<Checkbox onChange={handleVouchersChange} />}
            label="Vouchers"
            checked={checkboxStates.vouchersChecked}
            disabled={checkboxStates.allTypeChecked}
          />
          <FormControlLabel
            control={<Checkbox onChange={handleProductsChange} />}
            label="Products"
            checked={checkboxStates.productsChecked}
            disabled={checkboxStates.allTypeChecked}
          />
          <FormControlLabel
            control={<Checkbox onChange={handleGiftcardChange} />}
            label="Giftcard"
            checked={checkboxStates.giftcardChecked}
            disabled={checkboxStates.allTypeChecked}
          />
        </FormGroup>
        <Button fullWidth onClick={filterHandler} variant="contained" color="primary">Filter</Button>
      </Box>
    </Box >
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <MuiAppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item, index) => (
              <Button key={index} sx={{ color: '#fff' }}>
                <Link href={item.url} variant="body2" style={{ textDecoration: "none", color: "white" }} >
                  {item.name}
                </Link>
              </Button>
            ))}
          </Box>

          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
          </Typography>
          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle2}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <FilterListIcon />
          </IconButton>
        </Toolbar>
      </MuiAppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          anchor="right"
          container={container}
          variant="temporary"
          open={mobileOpen2}
          onClose={() => { }}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', minWidth: "80%" },
          }}
        >
          {drawer2}
        </Drawer>
      </Box>
    </Box>
  );
}

DrawerAppBar.propTypes = {
  window: PropTypes.func,
};

export default DrawerAppBar;
