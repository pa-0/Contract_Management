import AuthComponent from "@/Auth/AuthComponent/AuthComponent";
import { AuthorizedGSSP } from "@/Auth/AuthorizedGSSP/AuthorizedGSSP";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogTitle,
  Divider,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { AiFillFolderOpen, AiOutlineTeam } from "react-icons/ai";
import Chart from "@/ReusableComponets/Charts/Chart";
import Image from "next/image";
import {
  FiNavigation,
  FiUser,
  FiUserMinus,
  FiUserPlus,
  FiUsers,
  FiUserX,
  FiXCircle,
} from "react-icons/fi";

function Home() {
  const overallStats = [
    {
      total: "100",
      icon: <FiUser />,
      name: "Total Contract Count",
      bgColor: () => useTheme().palette.secondary.main,
      iconBgColor: () => useTheme().palette.secondary.dark,
    },
    {
      total: "27",
      name: "Total Partner Contract",
      icon: <FiUsers />,
      bgColor: () => useTheme().palette.primary.main,
      iconBgColor: () => useTheme().palette.primary.dark,
    },
    {
      total: "73",
      name: "Total Supplier Contract",
      icon: <FiUsers />,
      bgColor: () => useTheme().palette.warning.main,
      iconBgColor: () => useTheme().palette.warning.dark,
    },
    {
      total: "88",
      name: "Total Active Contract",
      icon: <FiUserPlus />,
      bgColor: () => useTheme().palette.success.main,
      iconBgColor: () => useTheme().palette.success.dark,
    },
    {
      total: "22",
      name: "Total Closed Contract",
      icon: <FiUserMinus />,
      bgColor: () => useTheme().palette.error.main,
      iconBgColor: () => useTheme().palette.error.dark,
    },
  ];
  // Customer Weekly
  const optionslinechart = {
    chart: {
      height: 350,
      type: "line",
      fontFamily: "'DM Sans', sans-serif",
      foreColor: "#adb0bb",
      zoom: {
        type: "x",
        enabled: true,
      },
      toolbar: {
        show: false,
      },
      shadow: {
        enabled: true,
        color: "#000",
        top: 18,
        left: 7,
        blur: 10,
        opacity: 1,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      title: {
        text: "Month",
      },
    },
    grid: {
      show: false,
    },
    colors: ["#33afc1", "#FFA384"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "straight",
      width: "2",
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      floating: true,
      offsetY: -25,
      offsetX: -5,
    },
    tooltip: {
      theme: "dark",
    },
  };
  const serieslinechart = [
    {
      name: "Contract Created - 2022",
      data: [12, 8, 12, 2, 5, 12, 18, 7, 7, 8, 8, 1],
    },
    {
      name: "Contract Closed - 2022",
      data: [1, 2, 3, 4, 2, 2, 3, 1, 0, 3, 1, 0],
    },
  ];
  // Tickets - PieChart
  const pieOptions = {
    colors: [
      useTheme().palette.success.main,
      useTheme().palette.secondary.main,
      useTheme().palette.primary.main,
      useTheme().palette.warning.main,
      useTheme().palette.error.main,
    ],
    chart: {
      type: "donut",
      height: 280,
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 7,
    },
    legend: {
      show: true,
      customLegendItems: [
        " Contract Agreements",
        "Sales Contracts",
        "PWA-PC Contracts",
        "Contract Amendments",
        " Contract Renewals",
      ],
      position: "bottom",
      verticalAlign: "bottom",
      align: "center",
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
    },
    plotOptions: {
      pie: {
        donut: {
          size: "78%",
          background: "transparent",
        },
      },
    },
    tooltip: {
      theme: "dark",
    },
    labels: [
      " Contract Agreements",
      "Sales Contracts",
      "PWA-PC Contracts",
      "Contract Amendments",
      " Contract Renewals",
    ],
  };
  const pieSeries = [25, 10, 30, 15, 20];
  // Tickets
  const tickets = [
    {
      assigned: "Al Humrani Fuchs Petroleum",
      role: "KSA",
      name: "Humrani Petroleum",
      priority: "active",
      budget: "9M USD",
      days: "2 days",
    },
    {
      assigned: "Khonaini Petroleum Services",
      role: "UAE",
      name: "Khonaini Petroleum",
      priority: "Closed",
      budget: "5M USD",
      days: "8 days",
    },
    {
      assigned: "Alsaleh Aluminium Materials",
      role: "OMAN",
      name: "Alsaleh Aluminium",
      priority: "active",
      budget: "6M USD",
      days: "15 days",
    },
    {
      assigned: "Al Faisal Steel Industries",
      role: "QATAR",
      name: "Al Faisal Steel",
      priority: "closed",
      budget: "8M USD",
      days: "18 days",
    },
  ];
  // Monthly Stats
  const optionsmonthlychart = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    colors: ["rgba(255,255,255,0.6)"],
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: "flat",
        endingShape: "flat",
        columnWidth: "30%",
        barHeight: "100%",
      },
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriesmonthlychart = [
    {
      name: "Monthly Contract",
      data: [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10, 12],
    },
  ];
  // Monthly Stats
  const optionsmonthlychart1 = {
    grid: {
      show: true,
      borderColor: "transparent",
      strokeDashArray: 2,
      padding: {
        left: 0,
        right: 0,
        bottom: 0,
      },
    },
    colors: ["rgba(255,255,255,1)"],
    chart: {
      toolbar: {
        show: false,
      },
      foreColor: "#adb0bb",
      fontFamily: "'DM Sans',sans-serif",
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        startingShape: "flat",
        endingShape: "flat",
        columnWidth: "30%",
        barHeight: "100%",
      },
    },
    dataLabels: {
      enabled: false,
    },

    legend: {
      show: false,
    },
    stroke: {
      show: true,
      width: 2,
      curve: "smooth",
      colors: ["transparent"],
    },
    tooltip: {
      theme: "dark",
    },
  };
  const seriesmonthlychart1 = [
    {
      name: "Monthly Contract",
      data: [6, 10, 9, 11, 9, 10, 12, 10, 9, 11, 9, 10, 12],
    },
  ];
  const [open1, setOpen1] = React.useState(false);
  const handleClickOpen1 = () => {
    setOpen1(true);
  };
  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} lg={12}>
        <Card data-aos="zoom-in-up" sx={{ p: 1 }}>
          <Grid container spacing={1}>
            {overallStats.map((row, index) => {
              return (
                <Grid item xs={12} lg={2.4} sm={6} sx={{ px: 1 }}>
                  <CardContent
                    sx={{
                      borderRight:
                        overallStats.length - 1 !== index
                          ? { xs: "0", sm: "1px solid rgba(0,0,0,0.1)" }
                          : "",
                      padding: "25px",
                      borderRadius: "10px",
                      background: row.bgColor,
                      color: "white",
                    }}
                  >
                    <IconButton
                      size="large"
                      sx={{
                        background: row.iconBgColor,
                        color: "white",
                        boxShadow: "none",
                        boxShadow:
                          "0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%)",
                        "&:hover": {
                          backgroundColor: "primary.light",
                          background: row.iconBgColor,
                        },
                      }}
                    >
                      {row.icon}
                    </IconButton>
                    <Box display="flex" alignItems="center" sx={{ mt: 2 }}>
                      <Typography variant="h3">{row.total}</Typography>
                    </Box>
                    <Typography color="#f0f0f0" variant="h6" fontWeight="400">
                      {row.name}
                    </Typography>
                  </CardContent>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card>
          <Box p={2} display="flex" alignItem="center">
            <Box flexGrow={1}>
              <Typography variant="h4">Yearly Contract</Typography>
            </Box>
          </Box>
          <CardContent>
            <Chart
              optionsreport={optionslinechart}
              seriesreport={serieslinechart}
              type="line"
              height="308"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={6}>
        <Card data-aos="zoom-in-up-right">
          <CardContent>
            <Typography variant="h3" fontWeight="500" sx={{ mr: "auto" }}>
              {"Contracts Types"}
            </Typography>
            <Typography
              variant="h6"
              sx={{ mb: 1 }}
              color="textSecondary"
              fontWeight="400"
            >
              Contract by partners
            </Typography>
            <Divider />
            <Box>
              <Chart
                optionsreport={pieOptions}
                seriesreport={pieSeries}
                type="donut"
                height="355"
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} sm={6} lg={8}>
        <Card>
          <CardContent>
            <TableContainer
              sx={{ height: "368px" }}
              style={{ padding: 0, boxShadow: "none" }}
              component={Paper}
            >
              <Table sx={{ whiteSpace: { xs: "nowrap", sm: "unset" } }}>
                <TableHead>
                  <TableRow>
                    {[
                      "Partner With",
                      "Contract Name",
                      "Remaining Days",
                      " Budget",
                    ].map((col) => {
                      return (
                        <TableCell>
                          <Typography variant="h6" fontWeight="400">
                            {col}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tickets.map((row, index) => {
                    return (
                      <>
                        <TableRow key={index}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <img
                                alt={row.name}
                                src="/profile.webp"
                                width="45px"
                                height="45px"
                                sx={{ borderRadius: "50px !important" }}
                              />
                              <Box sx={{ ml: 2 }}>
                                <Typography variant="h6" fontWeight="400">
                                  {row.assigned}
                                </Typography>
                                <Typography
                                  variant="body"
                                  color="textSecondary"
                                  fontWeight="400"
                                >
                                  {row.role}
                                </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" fontWeight="400">
                              {row.name}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" fontWeight="400">
                              <Chip
                                sx={{
                                  backgroundColor: (theme) =>
                                    theme.palette.error.main,
                                  color: "white",
                                  borderRadius: "6px",
                                }}
                                size="small"
                                label={`${row.days} to go`}
                              />
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="h6" fontWeight="400">
                              {row.budget}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card
          sx={{
            pb: 0,
            pr: 0,
            pl: 0,
            backgroundColor: (theme) => theme.palette.primary.main,
            color: "#fff",
          }}
          data-aos="zoom-in-up"
        >
          <CardContent sx={{ pl: "30px", pr: "30px" }}>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{ mb: 0, color: "#fff" }}
                  gutterBottom
                >
                  Partner Contract
                </Typography>
                <Typography variant="h2" sx={{ mb: 0, mt: 1 }} gutterBottom>
                  27
                </Typography>
              </Box>
              <Box sx={{ ml: "auto" }}>
                <IconButton
                  sx={{
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.secondary.dark,
                    },
                    color: "#fff",
                    height: "48px",
                    width: "48px",
                    boxShadow:
                      "rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px",
                  }}
                >
                  <FiNavigation height="24" width="24" />
                </IconButton>
              </Box>
            </Box>
            <Chart
              optionsreport={optionsmonthlychart}
              seriesreport={seriesmonthlychart}
              type="bar"
              height="75px"
            />
          </CardContent>
        </Card>
        <Card
          sx={{
            pb: 0,
            pr: 0,
            pl: 0,
            backgroundColor: (theme) => theme.palette.secondary.main,
            color: "#fff",
          }}
          data-aos="zoom-in-up"
        >
          <CardContent sx={{ pl: "30px", pr: "30px" }}>
            <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
              <Box>
                <Typography
                  variant="h5"
                  color="textSecondary"
                  sx={{ mb: 0, color: "#fff" }}
                  gutterBottom
                >
                  Supplier Contract
                </Typography>
                <Typography variant="h2" sx={{ mb: 0, mt: 1 }} gutterBottom>
                  73
                </Typography>
              </Box>
              <Box sx={{ ml: "auto" }}>
                <IconButton
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    "&:hover": {
                      backgroundColor: (theme) => theme.palette.primary.dark,
                    },
                    color: "#fff",
                    height: "48px",
                    width: "48px",
                    boxShadow:
                      "rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px",
                  }}
                >
                  <FiNavigation height="24" width="24" />
                </IconButton>
              </Box>
            </Box>
            <Chart
              optionsreport={optionsmonthlychart1}
              seriesreport={seriesmonthlychart1}
              type="area"
              height="75px"
            />
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardContent>
            <Box flexGrow={1} sx={{ py: 2 }}>
              <Typography variant="h4">Recently Contract created</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2, width: "100%" }}
            >
              <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                <Typography variant="h5" fontWeight="400">
                  
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5" fontWeight="500">
                   Humrani Petroleum Contract
                  </Typography>
                  <Typography variant="h6" fontWeight="400">
                   Al Humrani Petroleum 
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" sx={{ float: "right" }}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    color: "white",
                    borderRadius: "6px",
                  }}
                  size="small"
                  label="2022-06-11"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2, width: "100%" }}
            >
              <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                <Typography variant="h5" fontWeight="400">
                  
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column">
                  <Typography variant="h5" fontWeight="500">
                   Khonaini Petroleum Contract
                  </Typography>
                  <Typography variant="h6" fontWeight="400">
                  Khonaini Petroleum Services
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" sx={{ float: "right" }}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    color: "white",
                    borderRadius: "6px",
                  }}
                  size="small"
                  label="2022-06-11"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2, width: "100%" }}
            >
              <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                <Typography variant="h5" fontWeight="400">
                  
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                  <Typography variant="h5" fontWeight="500">
                  Al Faisal Steel Contract 
                  </Typography>
                  <Typography variant="h6" fontWeight="400">
                  Al Faisal Steel Industries
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" sx={{ float: "right" }}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    color: "white",
                    borderRadius: "6px",
                    pl: "3px",
                    pr: "3px",
                  }}
                  size="small"
                  label="2021-10-09"
                />
              </Box>
            </Box>
            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2, width: "100%" }}
            >
              <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                <Typography variant="h5" fontWeight="400">
                  3
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box display="flex" alignItems="center">
                  <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                    <Typography variant="h5" fontWeight="500">
                      PWA Contracts Doc.
                    </Typography>
                    <Typography variant="h6" fontWeight="400">
                      Partner 2
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" sx={{ float: "right" }}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    color: "white",
                    borderRadius: "6px",
                    pl: "3px",
                    pr: "3px",
                  }}
                  size="small"
                  label="2020-02-01"
                />
              </Box>
            </Box> */}
            {/* <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              sx={{ mb: 2, width: "100%" }}
            >
              <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                <Typography variant="h5" fontWeight="400">
                  4
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box display="flex" alignItems="center">
                  <Box display="flex" flexDirection="column" sx={{ ml: 0 }}>
                    <Typography variant="h5" fontWeight="500">
                      Contract Amendments
                    </Typography>
                    <Typography variant="h6" fontWeight="400">
                      Partner 1
                    </Typography>
                  </Box>
                </Box>
              </Box>
              <Box display="flex" sx={{ float: "right" }}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    color: "white",
                    borderRadius: "6px",
                    pl: "3px",
                    pr: "3px",
                  }}
                  size="small"
                  label="2021-01-10"
                />
              </Box>
            </Box> */}
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card data-aos="zoom-in-up-up">
          <CardContent>
            <Typography variant="h4" fontWeight="500">
              Recent Templete Added
            </Typography>
            <Box sx={{ my: 1, display: "flex" }}>
              <img
                src="/PDFimg.png"
                alt="pdf"
                height="90%"
                width="90%"
                layout="responsive"
              />
              <Tooltip title="Preview">
                <IconButton
                  size="small"
                  onClick={handleClickOpen1}
                  sx={{ color: "#000" }}
                >
                  <AiFillFolderOpen />
                </IconButton>
              </Tooltip>
              {open1 && (
                <Dialog
                  open={open1}
                  fullScreen
                  keepMounted
                  onClose={handleClose1}
                  aria-describedby="alert-dialog-slide-description"
                >
                  <DialogTitle
                    sx={{ p: 1 }}
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="h4">Contract Amendments</Typography>
                    <IconButton onClick={handleClose1}>
                      <FiXCircle />
                    </IconButton>
                  </DialogTitle>
                  <Divider />
                  <iframe
                    src="https://res.cloudinary.com/daxie0yfn/image/upload/v1669884616/contracts/r1200appendix_d_xczfz3.pdf"
                    type="application/pdf"
                    width="100%"
                    height="100%"
                    style={{ minHeight: "65vh" }}
                  />
                </Dialog>
              )}
            </Box>
            <Box display="flex">
              <Typography variant="h6" sx={{ mt: 2 }} fontWeight="500">
                Template Name :
              </Typography>
              <Typography variant="h6" color="gray" sx={{ mt: 2, px: 1 }}>
                PWA-PC Contract
              </Typography>
            </Box>
            <Box display="flex">
              <Typography variant="h6" sx={{ mt: 1 }} fontWeight="500">
                Created By :
              </Typography>
              <Typography variant="h6" color="gray" sx={{ mt: 1, px: 1 }}>
              Mazen Alzahrani
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} lg={4}>
        <Card>
          <CardContent>
            <Box flexGrow={1} sx={{ py: 2 }}>
              <Typography variant="h4">Recent Audit Details</Typography>
            </Box>
            <Divider sx={{ mb: 2 }} />
            <Grid container spacing={1}>
              <Grid item xs={12} sm={6}>
                <FormLabel sx={{ mt: 1 }} htmlFor="Name">
                  User
                </FormLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="400">
                 Mazen Alzahrani
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel sx={{ mt: 1 }} htmlFor="Name">
                  Action
                </FormLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    color: "white",
                    borderRadius: "6px",
                    pl: "3px",
                    pr: "3px",
                  }}
                  size="small"
                  label={`share`}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel sx={{ mt: 1 }} htmlFor="Name">
                  Document
                </FormLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="400">
                  Contract Amendments
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel sx={{ mt: 2 }} htmlFor="Name">
                  Description
                </FormLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" fontWeight="400">
                  Service Level Agreements Updated by Mazen Alzahrani
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormLabel sx={{ mt: 1 }} htmlFor="Name">
                  TimeStamp
                </FormLabel>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Chip
                  sx={{
                    backgroundColor: (theme) => theme.palette.error.main,
                    color: "white",
                    borderRadius: "6px",
                    pl: "3px",
                    pr: "3px",
                  }}
                  size="small"
                  label={`Dec 25 2020`}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}


export default AuthComponent(Home);

export const getServerSideProps = AuthorizedGSSP(
  async (context, jwtToken, signUser) => {
    return {
      props: {
        ...jwtToken,
      },
    };
  }
);