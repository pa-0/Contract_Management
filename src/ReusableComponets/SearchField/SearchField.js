import { IconButton, InputAdornment, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import CustomTextField from "../forms/CustomElements/CustomTextField";

function SearchField({ setsearchval }) {
  const [searchOpen, setSearchOpen] = useState(false);
  return (
    <>
      <CustomTextField
        placeholder="Search"
        fullWidth
        size="small"
        sx={{
          width: searchOpen ? "300px" : "0%",
          display: searchOpen ? "block" : "none",
          transition: "all 0.4s linear",
          mx: 1,
        }}
        onChange={(e) => setsearchval(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <IconButton onClick={() => setSearchOpen(false)}>
                <FiSearch />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Tooltip arrow title="Enable Search">
        <IconButton
          onClick={() => setSearchOpen(true)}
          size="small"
          sx={{
            display: !searchOpen ? "flex" : "none",
            alignItems: "center",
            background: "rgb(223, 223, 223)",
            "&:hover": {
              background: "rgb(223, 223, 223)",
            },
            borderRadius: "50%",
            height: "40px",
            width: "40px",
            mx: 1,
          }}
        >
          <FiSearch />
        </IconButton>
      </Tooltip>
    </>
  );
}

export default SearchField;
