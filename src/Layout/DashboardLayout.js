import { experimentalStyled, Container, Box } from "@mui/material";
import { useSelector } from "react-redux";
import HeaderNavbar from "./HeaderNavbar/HeaderNavbar";
import React from "react";

const MainWrapper = experimentalStyled("div")(() => ({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
  width: "100%",
}));

const ContentWrapper = experimentalStyled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  overflow: "hidden",
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.up("lg")]: {
    paddingTop: "64px",
  },
  [theme.breakpoints.down("lg")]: {
    paddingTop: "64px",
  },
}));

function DashboardLayout({ children }) {
  const ThemeCustom = useSelector((state) => state.ThemeCustomReducer);

  return (
    <MainWrapper>
      <HeaderNavbar
        sx={{
          backgroundColor:
            ThemeCustom.activeMode === "dark" ? "#20232a" : "#F3F5F8",
          boxShadow: "0 1px 5px #F3F5F8",
        }}
      />
      <ContentWrapper>
        <Container
          maxWidth={false}
          sx={{
            paddingTop: "40px",
          }}
        >
          <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
        </Container>
      </ContentWrapper>
    </MainWrapper>
  );
}

export default DashboardLayout;
