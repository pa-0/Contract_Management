import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";

function pageNotFound() {
  return (
    <Grid container spacing={0} sx={{ minHeight: "calc(100vh)" }}>
      <Grid item xs={12} alignSelf="center" textAlign="center">
        <Box>
          <img  width="80px" height="80px" src="https://img.icons8.com/flat-round/64/error--v1.png" alt="error"/>
          <Typography variant="h1" color="grey">
            500 - Server-side error
          </Typography>
          <Link href="/">
            <Typography
              sx={{ cursor: "pointer", my: 1 }}
              variant="h6"
              color="primary"
            >
              {" "}
              Go back home
            </Typography>
          </Link>
        </Box>
      </Grid>
    </Grid>
  );
}

pageNotFound.Layout = true;
export default pageNotFound;
