import React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { FiCreditCard } from "react-icons/fi";

const ProjectFilterCard = ({ props }) => {
  return (
    <div>
      <Card
        data-aos="zoom-in-up"
        sx={{
          backgroundColor: props.bgColor(),
          color: "#fff",
        }}
        style={{ cursor: "pointer" }}
        onClick={props.onFilter}
      >
        <CardContent>
          <Box
            display="flex"
            sx={{ position: "relative", alignItems: "flex-start" }}
          >
            <Typography variant="h4" sx={{ marginBottom: "0" }}>
              {props.filterName}
            </Typography>
            <Box
              sx={{
                marginLeft: "auto",
                mt: 3,
                position: "absolute",
                right: 0,
              }}
            >
              <IconButton
                disableRipple
                size="large"
                color="inherit"
                sx={{
                  backgroundColor: props.iconBgColor(),
                }}
              >
                {props.icon}
              </IconButton>
            </Box>
          </Box>
          <Typography
            variant="h1"
            fontWeight="700"
            sx={{ marginTop: "10px", lineHeight: "24px !important" }}
          >
            {props.count}
          </Typography>
          <Typography
            variant="h6"
            fontWeight="400"
            sx={{ marginBottom: "0", marginTop: "10px" }}
          >
            {props.count <= 1 ? "Project" : props.value}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectFilterCard;
