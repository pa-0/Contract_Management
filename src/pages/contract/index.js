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
  MenuItem,
  createFilterOptions,
} from "@mui/material";
import {
  FiEdit,
  FiFile,
  FiMoreHorizontal,
  FiSearch,
  FiTrash,
  FiXCircle,
} from "react-icons/fi";
import { AiFillFolderOpen, AiOutlinePlus } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SimpleBar from "simplebar-react";
import Slide from "@mui/material/Slide";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";

import TimelineDot from "@mui/lab/TimelineDot";
import { motion } from "framer-motion";

//* Custom Components
import CustomDataGrid from "@/ReusableComponets/CustomDataGrid/CustomDataGrid";
import CustomTextField from "@/ReusableComponets/forms/CustomElements/CustomTextField";
import CustomSnackbar from "@/ReusableComponets/CustomSnackbar/CustomSnackbar";
import { useEffect } from "react";
import { useRouter } from "next/router";
import CustomFormLabel from "@/ReusableComponets/forms/CustomElements/CustomFormLabel";
import CustomSelectField from "@/ReusableComponets/forms/CustomElements/CustomSelectField";
import AuthComponent from "@/Auth/AuthComponent/AuthComponent";
import { AuthorizedGSSP } from "@/Auth/AuthorizedGSSP/AuthorizedGSSP";

//* Dialog Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

//* Main Function
const Index = ({ contractList, contractMediaList, notFound }) => {
  useEffect(() => {
    if (notFound) {
      setsnackbarValue({
        duration: 3000,
        type: "error",
        infomation: "Error occured !! try Later !! ",
      });
      setsnackbarOpen(true);
    }
  }, []);

  const router = useRouter();
  //* Snackbar
  const [snackbarOpen, setsnackbarOpen] = useState(false);
  const [snackbarValue, setsnackbarValue] = useState({
    duration: 2000,
    type: "success",
    infomation: "Successfully Added Product !! ",
  });

  const [inputError, setInputError] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };

  //* Columns
  const columns = [
    { field: "sno", headerName: "S.No.", width: 70 },
    {
      field: "contractName",
      headerName: "Contract Name",
      width: 160,
      renderCell: (params) => {
        return (
          <Typography
            variant="h6"
            fontWeight={400}
            sx={{ cursor: "pointer" }}
            onClick={(e) => router.push(`/cms/contract/${params.row.id}`)}
          >
            {params.row.contractName}
          </Typography>
        );
      },
    },
    { field: "partnerName", headerName: "Partner Name", width: 160 },
    {
      field: "startingDate",
      headerName: "Starting Date",
      width: 130,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <Chip
              label={params.row.startingDate}
              color="primary"
              sx={{ borderRadius: "5px" }}
            />
          </Box>
        );
      },
    },
    {
      field: "endingDate",
      headerName: "Ending Date",
      width: 130,
      renderCell: (params) => {
        return (
          <Box display="flex" alignItems="center">
            <Chip
              label={params.row.endingDate}
              color="secondary"
              sx={{ borderRadius: "5px" }}
            />
          </Box>
        );
      },
    },
    {
      field: "associatedDocument",
      headerName: "Associated Doc.",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="small"
              sx={{
                color: (theme) => theme.palette.grey.A200,
              }}
              onClick={() => {
                handleClickOpen();
              }}
            >
              <FiMoreHorizontal />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Box display="flex" alignItems="center">
              <Chip
                label={`${params.row.associatedDocument.length}  / ${params.row.totalReqAssocDocument}`}
                color={
                  params.row.associatedDocument.length >=
                  params.row.totalReqAssocDocument
                    ? "success"
                    : "error"
                }
                sx={{ borderRadius: "5px" }}
              />
            </Box>
          </>
        );
      },
    },
    { field: "owner", headerName: "Owner", width: 120 },
    {
      field: "edit",
      headerName: "Edit",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="small"
              sx={{
                color: (theme) => theme.palette.grey.A200,
              }}
              onClick={() => {
                handleUpdateDialog(params.row);
              }}
            >
              <FiEdit />
            </IconButton>
          </>
        );
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 90,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              size="small"
              sx={{
                color: (theme) => theme.palette.grey.A200,
              }}
              onClick={() => handleDeleteRow(params.row)}
            >
              <FiTrash />
            </IconButton>
          </>
        );
      },
    },
  ];

  //* Rows
  const [rows, setrows] = useState(contractList);
  const [openDialog, setopenDialog] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [searchval, setsearchval] = useState("");
  const [sno, setsno] = useState(rows.length);

  const [dialogval, setdialogval] = useState({
    id: "",
    sno: "",
    contractName: "",
    partnerName: "",
    partnerAddress: "",
    partnerEmailID: "",
    startingDate: "",
    endingDate: "",
    associatedDocument: [],
    owner: "",
    totalReqAssocDocument: "",
  });
  const emptyDialogValue = async () => {
    await setdialogval({
      id: "",
      sno: sno + 1,
      contractName: "",
      partnerName: "",
      partnerAddress: "",
      partnerEmailID: "",
      startingDate: "",
      endingDate: "",
      associatedDocument: [],
      owner: "",
      totalReqAssocDocument: "",
    });
  };

  //* Dialog Handlers
  const handleClickDialog = async () => {
    await setopenDialog(true);
    await emptyDialogValue();
  };
  const handleUpdateDialog = async (row) => {
    await setdialogval(row);
    await setisUpdate(true);
    await setopenDialog(true);
  };
  const handleCloseDialog = async () => {
    await setopenDialog(false);
    await emptyDialogValue();
  };

  //* Primary Inputs
  const [inputField, setinputField] = useState([
    {
      label: "Contract Name",
      type: "text",
      field: "contractName",
      error: false,
      errorText: "Required *",
    },
    {
      label: "Starting Date",
      type: "date",
      field: "startingDate",
      error: false,
      errorText: "Required *",
    },
    {
      label: "Ending Date",
      type: "date",
      field: "endingDate",
      error: false,
      errorText: "Required *",
    },
    {
      label: "Total Associated Documents",
      type: "number",
      field: "totalReqAssocDocument",
      error: false,
      errorText: "Required *",
    },
    {
      label: "Owner",
      type: "text",
      field: "owner",
      error: false,
      errorText: "Required *",
    },
    {
      label: "Partner Address",
      type: "text",
      field: "partnerAddress",
      error: false,
      errorText: "Required *",
    },
    {
      label: "Partner Email ID",
      type: "email",
      field: "partnerEmailID",
      error: false,
      errorText: "Required *",
    },
  ]);

  const [selectionField, setselectionField] = useState([
    {
      label: "Partner Name",
      field: "partnerName",
      options: [
        {
          value: "Al Humrani Petroleum",
          label: "Al Humrani Petroleum",
        },
        {
          value: "Khonaini Petroleum Services",
          label: "Khonaini Petroleum Services",
        },
        {
          value: "Al Faisal Steel Industries",
          label: "Al Faisal Steel Industries",
        },
      ],
      error: false,
      errorText: "Required *",
    },
  ]);

  //* Validation
  const isValidated = () => {
    let result = true;
    let tempInput = inputField;
    tempInput = tempInput.map((input) => {
      if (dialogval[`${input.field}`] == "") {
        input.error = true;
        result = false;
      } else {
        input.error = false;
      }
      return input;
    });
    setinputField([...tempInput]);
    if (dialogval["associatedDocument"].length === 0) setInputError(true);
    let tempSelect = selectionField;
    tempInput = tempSelect.map((input) => {
      if (dialogval[`${input.field}`] == "") {
        input.error = true;
        result = false;
      } else {
        input.error = false;
      }
      return input;
    });
    setselectionField([...tempSelect]);
    return result;
  };

  //* Product CRUD
  const handleAddDetails = async () => {
    if (isValidated()) {
      await setrows([...rows, dialogval]);
      await setsno(sno + 1);
      await emptyDialogValue();
      await setopenDialog(false);
    }
  };
  const handleUpdateDetails = async () => {
    if (isValidated()) {
      const newRows = [...rows];
      let index = newRows.findIndex((ele) => ele.sno == dialogval.sno);
      newRows[index] = dialogval;
      await setrows([...newRows]);
      await emptyDialogValue();
      await setisUpdate(false);
      await setopenDialog(false);
    }
  };
  const handleDeleteRow = async (row) => {
    let newRows = [...rows];
    newRows = newRows.filter((e) => e.sno != row.sno);
    newRows = newRows.map((e, i) => {
      e.sno = i + 1;
      return e;
    });
    await setrows([...newRows]);
    await setsno(sno - 1);
  };

  //* AutoComplete Product List
  // const contractList = contractMediaList;

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
            Contract management
          </Typography>
          {open && (
            <Dialog
              open={open}
              TransitionComponent={Transition}
              keepMounted
              maxWidth="sm"
              fullWidth="sm"
              PaperProps={{
                style: { borderRadius: "20px", padding: "10px" },
              }}
            >
              <DialogTitle sx={{ fontSize: "16px" }}>
                Associated Documents
              </DialogTitle>
              <Divider />
              <DialogContent>
                <Timeline
                  sx={{
                    color: "rgba(0, 0, 0, 0.87)",
                    [`& .${timelineItemClasses.root}:before`]: {
                      flex: 0,
                      padding: 0,
                    },
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 250 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot
                          color="primary"
                          sx={{
                            p: 1,
                          }}
                        >
                          <FiFile style={{ height: "22px", width: "22px" }} />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box
                          sx={{
                            backgroundColor: "primary.light",
                            p: 2,
                            borderRadius: 6,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="h5" fontWeight="500">
                             Contract Workflow Document
                            </Typography>
                            <Tooltip title="Preview">
                              <IconButton
                                size="small"
                                onClick={handleClickOpen1}
                                sx={{ color: "#000" }}
                              >
                                <AiFillFolderOpen />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="h6" color="textSecondary">
                              11/11/2022, Monday
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              10:30 am
                            </Typography>
                          </Box>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 250 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5 }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot
                          color="warning"
                          sx={{
                            p: 1,
                          }}
                        >
                          <FiFile style={{ height: "22px", width: "22px" }} />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box
                          sx={{
                            backgroundColor: "warning.light",
                            p: 2,
                            borderRadius: 6,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="h5" fontWeight="500">
                              Contract Transaction Report
                            </Typography>
                            <Tooltip title="Preview">
                              <IconButton
                                size="small"
                                onClick={handleClickOpen1}
                                sx={{ color: "#000" }}
                              >
                                <AiFillFolderOpen />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="h6" color="textSecondary">
                              12/11/2022, Tuesday
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              11:30 am
                            </Typography>
                          </Box>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 250 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2 }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot
                          color="secondary"
                          sx={{
                            p: 1,
                          }}
                        >
                          <FiFile style={{ height: "22px", width: "22px" }} />
                        </TimelineDot>
                        <TimelineConnector />
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box
                          sx={{
                            backgroundColor: "secondary.light",
                            p: 2,
                            borderRadius: 6,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="h5" fontWeight="500">
                              Contract Phase 1 Report
                            </Typography>
                            <Tooltip title="Preview">
                              <IconButton
                                size="small"
                                onClick={handleClickOpen1}
                                sx={{ color: "#000" }}
                              >
                                <AiFillFolderOpen />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="h6" color="textSecondary">
                              12/11/2012, Tuesday
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              11:55 am
                            </Typography>
                          </Box>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 250 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2.5 }}
                  >
                    <TimelineItem>
                      <TimelineSeparator>
                        <TimelineDot
                          color="success"
                          sx={{
                            p: 1,
                          }}
                        >
                          <FiFile style={{ height: "22px", width: "22px" }} />
                        </TimelineDot>
                      </TimelineSeparator>
                      <TimelineContent>
                        <Box
                          sx={{
                            backgroundColor: "success.light",
                            p: 2,
                            borderRadius: 6,
                          }}
                        >
                          <Box
                            display="flex"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="h5" fontWeight="500">
                             Contract Phase 2 Report
                            </Typography>
                            <Tooltip title="Preview">
                              <IconButton
                                size="small"
                                onClick={handleClickOpen1}
                                sx={{ color: "#000" }}
                              >
                                <AiFillFolderOpen />
                              </IconButton>
                            </Tooltip>
                          </Box>
                          <Box display="flex" flexDirection="column">
                            <Typography variant="h6" color="textSecondary">
                              13/11/2012, Wednesday
                            </Typography>
                            <Typography variant="h6" color="textSecondary">
                              04:30 pm
                            </Typography>
                          </Box>
                        </Box>
                      </TimelineContent>
                    </TimelineItem>
                  </motion.div>
                </Timeline>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
              </DialogActions>
            </Dialog>
          )}
          {open1 && (
            <Dialog
              open={open1}
              fullScreen
              TransitionComponent={Transition}
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
                <Typography variant="h4">Contract</Typography>
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
                  <Tooltip title="Add new">
                    <IconButton
                      sx={{
                        backgroundColor: (theme) =>
                          theme.palette.secondary.main,
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.secondary.dark,
                        },
                        color: "#fff",
                        borderRadius: "50%",
                        ml: 1,
                      }}
                      onClick={handleClickDialog}
                    >
                      <AiOutlinePlus />
                    </IconButton>
                  </Tooltip>
                  <Dialog
                    PaperProps={{
                      style: { borderRadius: "20px", padding: "10px" },
                    }}
                    open={openDialog}
                    maxWidth="sm"
                    fullWidth="sm"
                  >
                    <DialogTitle sx={{ fontSize: "18px" }}>
                      Add Contract Content Details
                    </DialogTitle>
                    <Divider />
                    <SimpleBar style={{ height: "350px" }}>
                      <DialogContent>
                        {selectionField.map((input) => (
                          <>
                            <CustomFormLabel
                              sx={{ mt: 1 }}
                              htmlFor={input.field}
                            >
                              {input.label}
                            </CustomFormLabel>
                            <CustomSelectField
                              margin="dense"
                              size="small"
                              id={input.field}
                              fullWidth
                              variant="outlined"
                              value={dialogval[`${input.field}`]}
                              onChange={(e) => {
                                setdialogval({
                                  ...dialogval,
                                  [`${input.field}`]: e.target.value,
                                });
                              }}
                            >
                              {input.options.map((option) => (
                                <MenuItem value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))}
                            </CustomSelectField>
                            <FormHelperText
                              sx={{
                                px: 1,
                                color: () => useTheme().palette.error.dark,
                              }}
                            >
                              {dialogval[`${input.field}`] == "" && input.error
                                ? "Required *"
                                : ""}
                            </FormHelperText>
                          </>
                        ))}
                        {inputField.map((input, i) => (
                          <div key={i}>
                            <CustomFormLabel
                              sx={{ mt: 1 }}
                              htmlFor={input.field}
                            >
                              {input.label}
                            </CustomFormLabel>
                            <CustomTextField
                              autoFocus={i == 0}
                              margin="dense"
                              size="small"
                              id={input.field}
                              type={input.type}
                              fullWidth
                              variant="outlined"
                              value={dialogval[`${input.field}`]}
                              onChange={(e) => {
                                setdialogval({
                                  ...dialogval,
                                  [`${input.field}`]: e.target.value,
                                });
                              }}
                              error={
                                dialogval[`${input.field}`] == "" && input.error
                              }
                            />
                            <FormHelperText
                              sx={{
                                px: 1,
                                color: () => useTheme().palette.error.dark,
                              }}
                            >
                              {dialogval[`${input.field}`] == "" && input.error
                                ? "Required *"
                                : ""}
                            </FormHelperText>
                          </div>
                        ))}
                        <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                          Associated Documents
                        </CustomFormLabel>
                        <Autocomplete
                          multiple
                          options={contractMediaList}
                          value={dialogval.associatedDocument}
                          getOptionLabel={(option) => option.label}
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          onChange={(e, value) => {
                            if (
                              value.length < dialogval.totalReqAssocDocument
                            ) {
                              setdialogval({
                                ...dialogval,
                                associatedDocument: value,
                              });
                            } else {
                              setsnackbarValue({
                                duration: 3000,
                                type: "error",
                                infomation:
                                  "Associated Documents is equal to Total no.of Associated Documents",
                              });
                              setsnackbarOpen(true);
                            }
                          }}
                          filterSelectedOptions
                          renderInput={(params) => (
                            <CustomTextField
                              {...params}
                              size="small"
                              aria-label="Associated Documents"
                            />
                          )}
                          error={
                            dialogval["associatedDocument"].length === 0 &&
                            inputError
                          }
                        />
                        <FormHelperText
                          sx={{
                            px: 1,
                            color: () => useTheme().palette.error.dark,
                          }}
                        >
                          {dialogval["associatedDocument"].length === 0 &&
                          inputError
                            ? "Required *"
                            : ""}
                        </FormHelperText>
                      </DialogContent>
                    </SimpleBar>
                    <DialogActions>
                      <Button onClick={handleCloseDialog}>Cancel</Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={
                          isUpdate ? handleUpdateDetails : handleAddDetails
                        }
                      >
                        {isUpdate ? "Update Details" : "Add Details"}
                      </Button>
                    </DialogActions>
                  </Dialog>
                </Grid>
              </Grid>
              <div style={{ display: "flex", height: "500px" }}>
                <CustomDataGrid
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
                  rows={rows.filter((e) =>
                    e.partnerName
                      .toLocaleLowerCase()
                      .includes(searchval.toLocaleLowerCase())
                  )}
                  columns={columns}
                  disableSelectionOnClick={true}
                  //   onSelectionModelChange={(e) => {
                  //     console.log(e);
                  //     router.push(`/cms/contract/${e[0]}`);
                  //   }}
                />
              </div>
            </CardContent>
          </Card>
        </>
      )}
      <CustomSnackbar
        open={snackbarOpen}
        setOpen={setsnackbarOpen}
        snackbarValue={snackbarValue}
      />
    </>
  );
};


export default AuthComponent(Index);

export const getServerSideProps = AuthorizedGSSP(
  async (context, jwtToken, signUser) => {
    try {
      const contractList = [
        {
          id: "1",
          sno: 1,
          contractName: "Humrani Petroleum Contract",
          partnerName: "Al Humrani Petroleum",
          partnerAddress: "Prince Mohammed Bin Abdulaziz St, Al Andalus, Jeddah 23326, Saudi Arabia",
          partnerEmailID: "Humrani@gmail.com",
          startingDate: "2018-12-17",
          endingDate: "2022-06-11",
          associatedDocument: [
            {
              id: "6",
              label: "AnnualReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884616/contracts/r1200appendix_d_xczfz3.pdf",
            },
            {
              id: "7",
              label: "VerificationReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884617/contracts/wwah_verification-report_1_ic8epz.pdf",
            },
          ],
          owner: "Basrawi",
          totalReqAssocDocument: 3,
        },
        {
          id: "2",
          sno: 2,
          contractName: "Khonaini Petroleum Contract",
          partnerName: "Khonaini Petroleum Services",
          partnerAddress: "partner Address 2",
          partnerEmailID: "Khonaini@gmail.com",
          startingDate: "2016-08-06",
          endingDate: "2019-03-13",
          associatedDocument: [
            {
              id: "6",
              label: "AnnualReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884616/contracts/r1200appendix_d_xczfz3.pdf",
            },
            {
              id: "7",
              label: "VerificationReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884617/contracts/wwah_verification-report_1_ic8epz.pdf",
            },
            {
              id: "8",
              label: "TurnOverReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884664/contracts/Instructional_Guide_-_Turnover_Report_updated_08-06-20__TO_dbrqpd.pdf",
            },
          ],
          owner: "Sulaiman alKhonaini",
          totalReqAssocDocument: 3,
        },
        {
          id: "3",
          sno: 3,
          contractName: "Al Faisal Steel Contract",
          partnerName: "Al Faisal Steel Industries",
          partnerAddress: "7X7G+GC2, 39 St, Dammam 2nd Industrial City, Dammam 34325, Saudi Arabia",
          partnerEmailID: "Faisal@gmail.com",
          startingDate: "2020-12-06",
          endingDate: "2024-09-05",
          associatedDocument: [
            {
              id: "7",
              label: "VerificationReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884617/contracts/wwah_verification-report_1_ic8epz.pdf",
            },
            {
              id: "8",
              label: "TurnOverReport.pdf",
              url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884664/contracts/Instructional_Guide_-_Turnover_Report_updated_08-06-20__TO_dbrqpd.pdf",
            },
          ],
          owner: "Faisal Al Muhaidib",
          totalReqAssocDocument: 2,
        },
      ];
      const contractMediaList = [
        {
          id: "6",
          label: "AnnualReport.pdf",
          url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884616/contracts/r1200appendix_d_xczfz3.pdf",
        },
        {
          id: "7",
          label: "VerificationReport.pdf",
          url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884617/contracts/wwah_verification-report_1_ic8epz.pdf",
        },
        {
          id: "8",
          label: "TurnOverReport.pdf",
          url: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884664/contracts/Instructional_Guide_-_Turnover_Report_updated_08-06-20__TO_dbrqpd.pdf",
        },
      ];
      return {
        props: {
          contractList,
          contractMediaList,
        },
      };
    } catch (error) {
      return {
        props: {
          notFound: true,
        },
      };
    }
  }
);
