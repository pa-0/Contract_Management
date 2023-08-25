import { Grid, IconButton, Tooltip } from "@mui/material";
import { AiOutlinePlus } from "react-icons/ai";
import React from "react";
import SearchField from "../SearchField/SearchField";

function FormsSearchwithAdd({ setsearchval, handleAddClickDialog }) {
  return (
    <Grid container sx={{ pb: 0 }}>
      <Grid
        item
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        lg={12}
        md={12}
        xs={12}
      >
        <SearchField setsearchval={setsearchval} />
        <Tooltip arrow title="Add new">
          <IconButton
            sx={{
              backgroundColor: (theme) => theme.palette.secondary.main,
              "&:hover": {
                backgroundColor: (theme) => theme.palette.secondary.dark,
              },
              color: "#fff",
              borderRadius: "50%",
              // ml: 1,
            }}
            onClick={handleAddClickDialog}
          >
            <AiOutlinePlus />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}

export default FormsSearchwithAdd;
