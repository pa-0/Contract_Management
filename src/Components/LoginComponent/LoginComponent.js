import React, { useEffect, useRef } from "react";
import { PublicClientApplication } from "@azure/msal-browser";
import jwt_deocde from "jwt-decode";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import CustomFormLabel from "@/ReusableComponets/forms/CustomElements/CustomFormLabel";
import CustomTextField from "@/ReusableComponets/forms/CustomElements/CustomTextField";
import NextLink from "next/link";
import { TiVendorMicrosoft } from "react-icons/ti";
import { SiSap } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

import Image from "next/image";
import DataStore from "../../../DataStore";

function LoginComponent({ onMainLogin }) {
  //microsoft authentication setup code ..
  let publicClientApplication = new PublicClientApplication({
    auth: {
      clientId: process.env.MICROSOFT_CLIENT_ID,
      redirectUri: process.env.MICROSOFT_REDIRECT_URL,
      authority: process.env.MICROSOFT_AUTHORITY,
    },
  });
  //google authentication setup code...
  const googlebuttonref = useRef();

  const useScript = (url, onload) => {
    // useEffect(() => {
    //   let script = document.createElement("script");
    //   script.src = url;
    //   script.onload = onload;
    //   document.head.appendChild(script);
    //   return () => document.head.removeChild(script);
    // }, []);
  };
  useScript("https://accounts.google.com/gsi/client", () => {
    // window.google.accounts.id.initialize({
    //   client_id: process.env.GOOGLE_CLIENT_ID, // here's your Google ID
    //   callback: onGoogleLogin,
    // });
    // window.google.accounts.id.renderButton(googlebuttonref.current, {
    //   size: "medium",
    //   width: 385,
    // });

    // window.google.accounts.id.prompt();
  });
  //-------------------------LOgin code below ------------------------
  const onMicroftLogin = async () => {
    try {
      let loginval = await publicClientApplication.loginPopup({
        scopes: ["user.read"],
        prompt: "select_account",
      });
      //   await onMainLogin(loginval, "MS");
    } catch (err) {
      // console.log(err);
    }
  };
  const onGoogleLogin = async (response) => {
    let loginval = jwt_deocde(response.credential);
    await onMainLogin(loginval, "GOOGLE");
  };
  const onSignin = async () => {
    await onMainLogin(loginData, "NORMAL");
  };

  const [loginData, setloginData] = useState({ email: "", password: "" });
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        justifyContent: "center",
        position: "relative",
        background: " #0000000b",
      }}
    >
      <Grid
        item
        xs={12}
        sm={11}
        md={10}
        lg={10}
        display="flex"
        alignItems="center"
        sx={{
          background: (theme) =>
            `${theme.palette.mode === "dark" ? "#1c1f25" : "tansparent"}`,
        }}
      >
        <Grid container spacing={0} display="flex" justifyContent="center">
          <Grid
            item
            xs={12}
            sm={8}
            md={6}
            lg={5}
            xl={4}
            sx={{
              position: "relative",
              borderTop: "7px solid #FFA384",
              background: "white",
              borderRadius: "5px",
              borderBottom: "7px solid #FFA384",
              boxShadow: "0px 0px 20px #bfbdbd69",
            }}
          >
            <Box
              sx={{
                p: 4,
                pt: 0,
              }}
            >
              {/* <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image src={DataStore.KUPEXLOGO} height="100px" width="220px" />
              </Box>

              <Divider /> */}

              <Box
                sx={{
                  mt: 3,
                }}
              >
                <CustomFormLabel className="heading6" htmlFor="email">
                  Email Address
                </CustomFormLabel>
                <CustomTextField
                  variant="outlined"
                  id="email"
                  fullWidth
                  name="email"
                  type="email"
                  placeholder="Enter Email"
                  value={loginData.email}
                  onChange={(e) =>
                    setloginData({ ...loginData, email: e.target.value })
                  }
                />
                <CustomFormLabel className="heading6" htmlFor="email">
                  Password
                </CustomFormLabel>
                <CustomTextField
                  variant="outlined"
                  id="password"
                  fullWidth
                  name="password"
                  type="password"
                  placeholder="Enter Password"
                  value={loginData.password}
                  onChange={(e) => {
                    setloginData({ ...loginData, password: e.target.value });
                  }}
                />

                {/* <Box
                  sx={{
                    display: {
                      xs: "block",
                      sm: "flex",
                      lg: "flex",
                    },
                    alignItems: "center",
                  }}
                >
                  <Box
                    sx={{
                      ml: "auto",
                    }}
                  >
                    <NextLink href="/reset-password">
                      <Typography
                        fontWeight="500"
                        sx={{
                          display: "block",
                          textDecoration: "none",
                          mt: "16px",
                          mb: "16px",
                          color: "secondary.main",
                          cursor: "pointer",
                        }}
                      >
                        Forgot Password ?
                      </Typography>
                    </NextLink>
                  </Box>
                </Box> */}

                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    pt: "10px",
                    pb: "10px",
                    my: 2,
                  }}
                  onClick={onSignin}
                >
                  Sign In
                </Button>
                <Box
                  sx={{
                    position: "relative",
                    textAlign: "center",
                    mt: "10px",
                    mb: "10px",
                    "&::before": {
                      content: '""',
                      background: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#ecf0f2"
                        }`,
                      height: "1px",
                      width: "100%",
                      position: "absolute",
                      left: "0",
                      top: "13px",
                    },
                  }}
                >
                  <Typography
                    component="span"
                    color="textSecondary"
                    variant="h6"
                    fontWeight="400"
                    sx={{
                      position: "relative",
                      padding: "0 12px",
                      background: (theme) =>
                        `${theme.palette.mode === "dark" ? "#282c34" : "#fff"}`,
                    }}
                  >
                    or sign in with
                  </Typography>
                </Box>

                <Box>
                  {/* <Button
                    variant="outlined"
                    size="large"
                    display="flex"
                    alignitems="center"
                    justifycontent="center"
                    sx={{
                      width: "100%",
                      borderColor: (theme) =>
                        `${
                          theme.palette.mode === "dark" ? "#42464d" : "#dde3e8"
                        }`,
                      borderWidth: "2px",
                      textAlign: "center",
                      mt: 2,
                      pt: "10px",
                      pb: "10px",
                      "&:hover": {
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                      },
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      width="100%"
                      height="100%"
                      sx={{ overflow: "hidden" }}
                    >
                      <div
                        ref={googlebuttonref}
                        style={{ minWidth: "100%", minHeight: "100%" }}
                      ></div>
                    </Box>
                  </Button> */}
                </Box>

                <Grid container spacing={2}>
                  {/* <Grid item xs={12} sm={6} lg={6}>
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      justifycontent="center"
                      sx={{
                        width: "100%",
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: 2,
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                        },
                      }}
                    >
                      <Box display="flex" alignItems="center">
                        <SiSap style={{ fontSize: "20px" }} />
                        <Typography
                          className="heading6"
                          variant="h6"
                          sx={{
                            ml: 1,
                            color: (theme) =>
                              `${
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey.A200
                                  : "#13152a"
                              }`,
                          }}
                        >
                          Suser ID
                        </Typography>
                      </Box>
                    </Button>
                  </Grid> */}

                  <Grid item xs={12} sm={12} lg={12}>
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      justifycontent="center"
                      sx={{
                        width: "100%",
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: { xs: 0, sm: 2 },
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                        },
                      }}
                      // onClick={onMicroftLogin}
                      disabled
                    >
                      <Box display="flex" alignItems="center">
                        <FcGoogle
                          style={{ fontSize: "20px", color: "#bd34eb" }}
                        />
                        <Typography
                          className="heading6"
                          variant="h6"
                          sx={{
                            ml: 1,
                            color: (theme) =>
                              `${
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey.A200
                                  : "#13152a"
                              }`,
                          }}
                        >
                          Google
                        </Typography>
                      </Box>
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      justifycontent="center"
                      sx={{
                        width: "100%",
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: { xs: 0, sm: 2 },
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                        },
                      }}
                      // onClick={onMicroftLogin}
                      disabled
                    >
                      <Box display="flex" alignItems="center">
                        <TiVendorMicrosoft
                          style={{ fontSize: "20px", color: "#bd34eb" }}
                        />
                        <Typography
                          className="heading6"
                          variant="h6"
                          sx={{
                            ml: 1,
                            color: (theme) =>
                              `${
                                theme.palette.mode === "dark"
                                  ? theme.palette.grey.A200
                                  : "#13152a"
                              }`,
                          }}
                        >
                          Microsoft
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default LoginComponent;
