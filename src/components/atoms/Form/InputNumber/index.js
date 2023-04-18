import React, { useState } from "react";
import propTypes from "prop-types";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import Jump from "react-reveal/Jump";
import { Grid, Typography } from "@mui/material";

export default function Number(props) {
  const { value, name } = props;

  const [InputValue, setInputValue] = useState(`${value}`);

  const onChange = (e) => {
    let value = String(e.target.value);
    props.onChange({
      target: {
        name: name,
        value: +value,
      },
    });
    setInputValue(`${value}`);
  };

  const minus = () => {
    onChange({
      target: {
        name: name,
        value: +value - 1,
      },
    });
  };
  const plus = () => {
    onChange({
      target: {
        name: name,
        value: +value + 1,
      },
    });
  };

  return (
    <Box
      sx={{
        color: "action.active",
        display: "flex",
        flexDirection: "column",
        "& > *": {
          marginBottom: 2,
        },
        "& .MuiBadge-root": {
          marginRight: 4,
        },
      }}
    >
      <Grid
        xs={12}
        sx={{
          mt: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <HolidayVillageIcon />
        <Typography>
          &nbsp; night{+InputValue > 1 ? "s" : ""} &nbsp;&nbsp;
        </Typography>
        <Jump spy={String(InputValue)}>
          <Badge color="secondary" badgeContent={String(InputValue)}></Badge>
        </Jump>
        <ButtonGroup>
          <Button aria-label="reduce" onClick={minus}>
            <RemoveIcon fontSize="small" />
          </Button>
          <input
            hidden
            name={name}
            className="form-control"
            value={String(InputValue)}
            onChange={onChange}
          />
          <Button aria-label="increase" onClick={plus}>
            <AddIcon fontSize="small" />
          </Button>
        </ButtonGroup>
      </Grid>
    </Box>
  );
}

Number.propTypes = {
  value: propTypes.oneOfType([propTypes.string, propTypes.number]),
  onChange: propTypes.func,
  outerClassName: propTypes.string,
};
