"use client";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  Toolbar,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Image from "next/image";
import User from "../../../assets/img/profile.png";
import NavList from "../NavList/NavList";
import { useState } from "react";
import CustomSnackbar from "@/ReusableComponets/CustomSnackbar/CustomSnackbar";
import { onLogoutRedux } from "@/store/Authentication/Action";
import { useRouter } from "next/router";

const HeaderNavbar = ({ sx, customClass, position }) => {
  const router = useRouter();
  const dispatch = useDispatch();
    //* Snackbar
    const [snackbarOpen, setsnackbarOpen] = useState(false);
    const [snackbarValue, setsnackbarValue] = useState({
      duration: 5000,
      type: "error",
      infomation: "something went wrong !! Cannot logout right now !!",
    });
  //* Profile
  const [profileMenu, setprofileMenu] = useState(null);

  const profileClick = (event) => {
    setprofileMenu(event.currentTarget);
  };
  const profileClose = () => {
    setprofileMenu(null);
  };

  //* Logout
  const logout = () => {
    fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => { response.json()})
      .then(async (response) => {
        console.log("res");
        router.push("/login");
        await dispatch(onLogoutRedux());
      })
      .catch((err) => {
        setsnackbarOpen(true);
      });
  };
  return (
    <>
      <AppBar sx={sx} position={position} elevation={0} className={customClass}>
        <Toolbar
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <img
              width="48"
              height="48"
              src="https://img.icons8.com/fluency/48/old-vmware-logo.png"
              alt="old-vmware-logo"
            />
            <Box pl={1.5} pb={1}>
              <NavList />
            </Box>
          </Box>
          <Box>
            {/* //* Notification */}
            <IconButton
              size="medium"
              aria-label="notification"
              color="inherit"
              aria-controls="notification-menu"
              aria-haspopup="true"
              sx={{ color: "#b0afae" }}
            >
              <NotificationsActiveIcon />
            </IconButton>
            {/* //* Profile */}
            <Button
              aria-label="menu"
              color="inherit"
              aria-controls="profile-menu"
              aria-haspopup="true"
              onClick={profileClick}
            >
              <Box display="flex" alignItems="center">
                <Image
                  src={User}
                  alt="user-image"
                  className="roundedCircle"
                  width={35}
                  height={35}
                  style={{ borderRadius: "50px" }}
                />
              </Box>
            </Button>
            <Menu
              id="profile-menu"
              anchorEl={profileMenu}
              keepMounted
              open={Boolean(profileMenu)}
              onClose={profileClose}
              sx={{
                "& .MuiMenu-paper": {
                  width: "215px",
                  right: "10px  !important",
                  top: "70px !important",
                  left: "auto !important",
                },
                "& .MuiList-padding": {
                  p: "10px",
                },
              }}
            >
              <Box>
                <Button
                  onClick={logout}
                  sx={{
                    mt: 2,
                    display: "block",
                    width: "100%",
                  }}
                  variant="contained"
                  color="primary"
                >
                  Logout
                </Button>
              </Box>
            </Menu>
            <CustomSnackbar
        open={snackbarOpen}
        setOpen={setsnackbarOpen}
        snackbarValue={snackbarValue}
      />
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default HeaderNavbar;
