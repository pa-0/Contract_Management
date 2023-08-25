import { Breadcrumbs, Typography } from "@mui/material";
import React from "react";

function HeadDescription({ content }) {
  return (
    <Breadcrumbs sx={{ px: 2, width: "300px" }} data-aos="zoom-in-up">
      <Typography variant="h5">{content}</Typography>
    </Breadcrumbs>
  );
}

export default HeadDescription;
