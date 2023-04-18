import React from "react";
import PropTypes from "prop-types";
import { Breadcrumbs, Link, Typography } from "@mui/material";

function Breadcrumb(props) {
  const { data, className } = props;

  return (
    <nav aria-label="breadcrumb">
      <Breadcrumbs className={className}>
        {data.map((item, index) => {
          const isLast = index === data.length - 1;
          return isLast ? (
            <Typography key={`breadcrumb-${index}`} color="textPrimary">
              {item.pageTitle}
            </Typography>
          ) : (
            <Link
              key={`breadcrumb-${index}`}
              color="inherit"
              href={item.pageHref}
              title={item.pageTitle}
            >
              {item.pageTitle}
            </Link>
          );
        })}
      </Breadcrumbs>
    </nav>
  );
}

Breadcrumb.propTypes = {
  data: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Breadcrumb;
