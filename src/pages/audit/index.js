//* Frontend Imports
import React, { useState } from "react";
import {
  Card,
  Box,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Tooltip,
  Typography,
  Divider,
  Button,
  FormHelperText,
  useTheme,
  Autocomplete,
  AvatarGroup,
  Avatar,
  Chip,
  Badge,
} from "@mui/material";
import {
  FiDownload,
  FiEdit,
  FiMoreHorizontal,
  FiSearch,
  FiTrash,
  FiUser,
} from "react-icons/fi";
import { VscCircleFilled } from "react-icons/vsc";
import { AiOutlinePlus } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SimpleBar from "simplebar-react";
import Slide from "@mui/material/Slide";
import pptxgen from "pptxgenjs";

//* Custom Components
import CustomDataGrid from "@/ReusableComponets/CustomDataGrid/CustomDataGrid";
import CustomFormLabel from "@/ReusableComponets/forms/CustomElements/CustomFormLabel";
import CustomTextField from "@/ReusableComponets/forms/CustomElements/CustomTextField";
// import ProductDialog from "../../../src/components - Copy/Content/ProductDialog";
// import CustomSnackbar from "../../../src/components - Copy/ReusableComponets/CustomSnackbar/CustomSnackbar";
import { useEffect } from "react";

//* Dialog Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//* Main Function
const Index = ({ audit, notFound }) => {
  //* Columns
  const columns = [
    { field: "sno", headerName: "S.No.", width: 80 },
    { field: "primaryUser", headerName: "Primary User", width: 160 },
    {
      field: "userAction",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <Tooltip title={params.row.userAction}>
            <Chip
              variant="contained"
              label={params.row.userAction}
              sx={{ m: "2px" }}
              color={
                params.row.userAction == "Share"
                  ? "primary"
                  : params.row.userAction == "Create"
                  ? "secondary"
                  : params.row.userAction == "Update"
                  ? "warning"
                  : params.row.userAction == "Delete"
                  ? "error"
                  : "success"
              }
            />
          </Tooltip>
        );
      },
    },
    { field: "DocumentName", headerName: "Document Name", width: 140 },
    { field: "Description", headerName: "Description", width: 260 },
    {
      field: "usersInvolved",
      headerName: "Users Involved",
      width: 120,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            {params.row.usersInvolved.map((value, index) => (
              <Tooltip title={value} key={index}>
                <Avatar
                  sx={{
                    backgroundColor: (theme) => theme.palette.primary.main,
                    width: "35px",
                    height: "35px",
                    color: "#fff",
                    ml: "-8px",
                  }}
                >
                  {value.substring(0, 1).toUpperCase()}
                </Avatar>
              </Tooltip>
            ))}
          </Box>
        );
      },
    },
    {
      field: "timestamp",
      headerName: "Time Stamp",
      width: 140,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <Chip
              label={params.row.timestamp}
              color="error"
              sx={{ borderRadius: "5px" }}
            />
          </Box>
        );
      },
    },
  ];

  const [searchval, setsearchval] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [pageSize, setPageSize] = React.useState(10);
  return (
    <>
      {!notFound && (
        <>
          <Typography
            variant="h5"
            color="gray"
            sx={{ p: 3, pb: 1, pt: 1 }}
            data-aos="zoom-in-up"
          >
            Audit
          </Typography>
          <Card>
            <CardContent>
              <Grid container>
                <Grid
                  item
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-end"
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <CustomTextField
                    placeholder="Search"
                    fullWidth
                    size="small"
                    sx={{
                      width: searchOpen ? "300px" : "0%",
                      display: searchOpen ? "block" : "none",
                      transition: "all 0.4s linear",
                    }}
                    onChange={(e) => setsearchval(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment>
                          <IconButton onClick={() => setSearchOpen(false)}>
                            <FiSearch />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <Tooltip title="Enable Search">
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
                      }}
                    >
                      <FiSearch />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
              <div style={{ display: "flex", height: "1020px" }}>
                <CustomDataGrid
                  management="true"
                  getRowHeight={() => "auto"}
                  sx={{
                    "&.MuiDataGrid-root--densityCompact .MuiDataGrid-cell": {
                      py: "8px",
                    },
                    "&.MuiDataGrid-root--densityStandard .MuiDataGrid-cell": {
                      py: "15px",
                    },
                    "&.MuiDataGrid-root--densityComfortable .MuiDataGrid-cell":
                      {
                        py: "22px",
                      },
                    border: "none",
                    color: "#000",
                  }}
                  rows={audit.filter((e) =>
                    e.primaryUser
                      .toLocaleLowerCase()
                      .includes(searchval.toLocaleLowerCase())
                  )}
                  columns={columns}
                  pageSize={pageSize}
                  onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                  rowsPerPageOptions={[10, 20, 50, 100]}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default Index;

export const getServerSideProps = () => {
  try {
    const audit = [
      {
        id: "1",
        sno: 1,
        primaryUser: "Megren AlSuhaimi ",
        userAction: "Share",
        DocumentName: "Contract Amendments",
        Description:
          "Contract Amendments is Shared with Control Components Inc.",
        usersInvolved: ["Mazen Alzahrani", "Control Components Inc."],
        timestamp: "Nov 11 2022 11:34:34",
      },
      {
        id: "2",
        sno: 2,
        primaryUser: "Megren AlSuhaimi ",
        userAction: "Create",
        DocumentName: "Contract Renewals",
        Description: " Contract Renewals is created by Megren AlSuhaimi ",
        usersInvolved: ["M Megren AlSuhaimi "],
        timestamp: "Sept 05 2022 12:34:34",
      },
      {
        id: "3",
        sno: 3,
        primaryUser: "Megren AlSuhaimi ",
        userAction: "Update",
        DocumentName: "TP Contract",
        Description: "TP Contract file is updated by Mazen Alzahrani",
        usersInvolved: ["R Mazen Alzahrani"],
        timestamp: "Jan 11 2021 10:32:33",
      },
      {
        id: "4",
        sno: 4,
        primaryUser: "Mazen Alzahrani",
        userAction: "Delete",
        DocumentName: "Contract Close-Out",
        Description: "Contract Close-Out is deleted by Mazen Alzahrani",
        usersInvolved: ["A Mazen Alzahrani"],
        timestamp: "Jan 12 2021 04:31:23",
      },
      {
        id: "5",
        sno: 5,
        primaryUser: "Megren AlSuhaimi ",
        userAction: "Update",
        DocumentName: "PWA-PC Contracts",
        Description: "PWA-PC Contracts is updated by Megren AlSuhaimi ",
        usersInvolved: ["B Megren AlSuhaimi "],
        timestamp: "Feb 14 2022 14:36:32",
      },
      {
        id: "6",
        sno: 6,
        primaryUser: "Rana Alwetaid",
        userAction: "Share",
        DocumentName: "TP Contract",
        Description: "TP Contract is Shared by Rana Alwetaid ",
        usersInvolved: ["R Rana Alwetaid", "Customer 1"],
        timestamp: "Oct 02 2019 02:06:22",
      },
      {
        id: "7",
        sno: 7,
        primaryUser: "Megren AlSuhaimi ",
        userAction: "Create",
        DocumentName: "Contract Agreements",
        Description: "Contract Agreements is created by Megren AlSuhaimi  ",
        usersInvolved: ["S Megren AlSuhaimi "],
        timestamp: "May 23 2020 04:06:22",
      },
      {
        id: "8",
        sno: 8,
        primaryUser: "Mazen Alzahrani",
        userAction: "Update",
        DocumentName: "Service Level Agreements",
        Description: "Service Level Agreements Updated by Mazen Alzahrani ",
        usersInvolved: ["B Mazen Alzahrani"],
        timestamp: "Dec 25 2009 04:06:42",
      },
      {
        id: "9",
        sno: 9,
        primaryUser: "Megren AlSuhaimi ",
        userAction: "Delete",
        DocumentName: "Non-Disclosure Agreements",
        Description:
          "Non-Disclosure Agreements is deleted by Megren AlSuhaimi ",
        usersInvolved: ["A Megren AlSuhaimi "],
        timestamp: "Jan 12 2021 04:31:23",
      },
      {
        id: "10",
        sno: 10,
        primaryUser: "Mazen Alzahrani",
        userAction: "Create",
        DocumentName: "Certificates",
        Description: "Certificates is created by Mazen Alzahrani",
        usersInvolved: ["K Mazen Alzahrani"],
        timestamp: "Mar 02 2021 14:36:32",
      },
    ];

    return {
      props: {
        audit,
      },
    };
  } catch (error) {
    return {
      props: {
        notFound: true,
      },
    };
  }
};
