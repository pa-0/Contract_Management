import React from "react";
import { Popover } from "@mui/material";

const MenuPopOver = ({ open, anchorEl, handleClose, children, top }) => {
  return (
    <div>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        PaperProps={{
          sx: {
            backgroundColor: "rgb(255, 255, 255)",
            color: "rgb(33, 43, 54)",
            // boxShadow: "10px -2px 75px -40px rgba(89,89,89,0.7)",
            boxShadow:
              "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px",
            borderRadius: "12px",
            padding: "8px",
            width: "160px",
            overflow: "inherit",
            marginTop: " -6px",
          },
        }}
      >
        <span
          style={{
            zIndex: "1",
            width: "12px",
            height: "12px",
            content: "",
            display: "block",
            position: "absolute",
            transform: "rotate(-135deg)",
            background: "rgb(255, 255, 255)",
            borderRadius: " 0px 0px 0px 3px",
            right: "-6px",
            borderBottom: "1px solid rgba(145, 158, 171, 0.12)",
            borderLeft: "1px solid rgba(145, 158, 171, 0.12)",
            top,
          }}
        ></span>
        {children}
      </Popover>
    </div>
  );
};

export default MenuPopOver;
