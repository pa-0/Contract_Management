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
  Stepper,
  Step,
  StepLabel,
  FormHelperText,
  useTheme,
  Autocomplete,
  Menu,
  MenuItem,
  Tab,
  Chip,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import {
  FiCopy,
  FiDelete,
  FiDownload,
  FiEdit,
  FiEdit2,
  FiExternalLink,
  FiLink,
  FiLock,
  FiMoreHorizontal,
  FiSearch,
  FiShare2,
  FiTrash,
  FiUploadCloud,
} from "react-icons/fi";
import { GoGlobe } from "react-icons/go";
import { AiOutlineFolderOpen, AiOutlinePlus } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SimpleBar from "simplebar-react";
import Slide from "@mui/material/Slide";
import { TabContext, TabList, TabPanel } from "@mui/lab";

import CustomDataGrid from "@/ReusableComponets/CustomDataGrid/CustomDataGrid";
import CustomFormLabel from "@/ReusableComponets/forms/CustomElements/CustomFormLabel";
import CustomTextField from "@/ReusableComponets/forms/CustomElements/CustomTextField";
import CustomSelectField from "@/ReusableComponets/forms/CustomElements/CustomSelectField";
import PreviewMedia from "@/ReusableComponets/PreviewMedia/PreviewMedia";
import ShareMedia from "@/Components/ShareMedia/ShareMedia";
import EditContract from "@/Components/EditContract/EditContract";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Index = () => {
  const [moreDet, setMoreDet] = useState({ info: {} });

  const [preview, setpreview] = useState({ open: false, value: "" });
  const [share, setshare] = React.useState(null);
  const shareOpen = Boolean(share);
  const onShareOpen = (event) => {
    setshare(event.currentTarget);
  };
  const onShareClose = () => {
    setshare(null);
  };

  const copyToClipboardName = async (text) => {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text ?? "");
    } else {
      document.execCommand("copy", true, text ?? "");
    }
    onShareClose();
  };

  const [currentMedia, setcurrentMedia] = useState({ media: null });
  const [shareto, setshareto] = React.useState({
    open: false,
    shareto: "",
    media: null,
  });
  const getList = (shareto) => {
    if (shareto == "Suppiler") {
      return [
        { id: "SUP01", label: "Well Flow" },
        { id: "SUP02", label: "Subsea well" },
      ];
    } else if (shareto == "Customer") {
      return [{ id: "CID01", label: "Customer 1" }];
    } else {
      return [
        { id: "EMP01", label: "Megren AlSuhaimi " },
        { id: "EMP02", label: "Mazen Alzahrani" },
      ];
    }
  };
  const onshare = (media, list) => {
    console.log(media, list);
  };
  const columns = [
    { field: "id", headerName: "S.No.", width: 70 },
    {
      field: "docID",
      headerName: "Document ID",
      width: 120,
    },
    { field: "fname", headerName: "Document Name", width: 160 },
    {
      field: "tags",
      headerName: "Document Type",
      width: 140,
    },
    {
      field: "vendName",
      headerName: "Vendor Name",
      width: 120,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "preview",
      headerName: "Preview",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Preview">
              <IconButton
                size="small"
                color="success"
                onClick={() =>
                  setpreview({ open: true, value: params.row.fileurl })
                }
              >
                <AiOutlineFolderOpen
                  style={{ height: "20px", width: "20px" }}
                />
              </IconButton>
            </Tooltip>
            <PreviewMedia preview={preview} setpreview={setpreview} />
          </>
        );
      },
    },
    {
      field: "share",
      headerName: "Share",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Share">
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  setcurrentMedia({
                    media: {
                      id: params.row.id,
                      name: params.row.fname,
                      imageUrl: params.row.fileurl,
                    },
                  });
                  onShareOpen(e);
                }}
                sx={{ mx: 1 }}
              >
                <FiShare2 style={{ height: "20px", width: "20px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={share}
              id="media"
              open={shareOpen}
              onClose={onShareClose}
              sx={{ width: 390 }}
              PaperProps={{
                style: {
                  width: 220,
                },
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.112))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
            >
              <MenuItem
                onClick={() => copyToClipboardName(currentMedia.media.name)}
              >
                <Box display="flex" alignItems="center">
                  <IconButton size="small" color="error" sx={{ mx: 1 }}>
                    <FiCopy style={{ height: "20px", width: "20px" }} />
                  </IconButton>
                  <Typography variant="h5">Copy Name</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => copyToClipboardName(currentMedia.media.imageUrl)}
              >
                <Box display="flex" alignItems="center">
                  <IconButton size="small" color="error" sx={{ mx: 1 }}>
                    <FiLink style={{ height: "20px", width: "20px" }} />
                  </IconButton>
                  <Typography variant="h5">Copy Link</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => copyToClipboardName(currentMedia.media.imageUrl)}
              >
                <a
                  style={{ textDecoration: "none", color: "#000" }}
                  href="/ContractRewalTemplate.pdf"
                  download
                >
                  <Box display="flex" alignItems="center">
                    <IconButton size="small" color="error" sx={{ mx: 1 }}>
                      <FiDownload style={{ height: "20px", width: "20px" }} />
                    </IconButton>
                    <Typography variant="h5">Download</Typography>
                  </Box>
                </a>
              </MenuItem>
              <Divider />
              <MenuItem disabled>Share</MenuItem>

              <MenuItem
                onClick={() =>
                  setshareto({
                    open: true,
                    shareto: "Employee",
                    media: {
                      id: params.row.id,
                      name: params.row.fname,
                      imageUrl: params.row.fileurl,
                    },
                  })
                }
              >
                <Box display="flex" alignItems="center">
                  <IconButton size="small" color="primary" sx={{ mx: 1 }}>
                    <FiExternalLink style={{ height: "20px", width: "20px" }} />
                  </IconButton>
                  <Typography variant="h5">Employee</Typography>
                </Box>
              </MenuItem>
            </Menu>
            <ShareMedia
              shareto={shareto}
              setshareto={setshareto}
              getList={getList}
              onshare={onshare}
            />
          </>
        );
      },
    },
    {
      field: "Extract",
      headerName: "Extract",
      width: 80,
      renderCell: (params) => {
        return (
          <Tooltip title="Extract">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                handleClickOpen();
                setdialogval({ ...dialogval, tags: params.row.tags });
              }}
            >
              <FiUploadCloud style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        return (
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="success"
              onClick={() => handleEditOpen(params.row, "private")}
            >
              <FiEdit2 style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        return (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteRow(params.row)}
            >
              <FiTrash style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  const columns1 = [
    { field: "id", headerName: "to.", width: 70 },
    {
      field: "docID",
      headerName: "Document ID",
      width: 120,
    },
    { field: "fname", headerName: "Document Name", width: 160 },
    {
      field: "tags",
      headerName: "Document Type",
      width: 160,
    },
    {
      field: "date",
      headerName: "Date",
      width: 120,
    },
    {
      field: "vendName",
      headerName: "Vendor Name",
      width: 120,
    },
    {
      field: "preview",
      headerName: "Preview",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Preview">
              <IconButton
                size="small"
                color="success"
                onClick={() =>
                  setpreview({ open: true, value: params.row.fileurl })
                }
              >
                <AiOutlineFolderOpen
                  style={{ height: "20px", width: "20px" }}
                />
              </IconButton>
            </Tooltip>
            <PreviewMedia preview={preview} setpreview={setpreview} />
          </>
        );
      },
    },
    {
      field: "share",
      headerName: "Share",
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Share">
              <IconButton
                size="small"
                color="primary"
                onClick={(e) => {
                  setcurrentMedia({
                    media: {
                      id: params.row.id,
                      name: params.row.fname,
                      imageUrl: params.row.fileurl,
                    },
                  });
                  onShareOpen(e);
                }}
                sx={{ mx: 1 }}
              >
                <FiShare2 style={{ height: "20px", width: "20px" }} />
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={share}
              id="media"
              open={shareOpen}
              onClose={onShareClose}
              sx={{ width: 390 }}
              PaperProps={{
                style: {
                  width: 220,
                },
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.112))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
            >
              <MenuItem
                onClick={() => copyToClipboardName(currentMedia.media.name)}
              >
                <Box display="flex" alignItems="center">
                  <IconButton size="small" color="error" sx={{ mx: 1 }}>
                    <FiCopy style={{ height: "20px", width: "20px" }} />
                  </IconButton>
                  <Typography variant="h5">Copy Name</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => copyToClipboardName(currentMedia.media.imageUrl)}
              >
                <Box display="flex" alignItems="center">
                  <IconButton size="small" color="error" sx={{ mx: 1 }}>
                    <FiLink style={{ height: "20px", width: "20px" }} />
                  </IconButton>
                  <Typography variant="h5">Copy Link</Typography>
                </Box>
              </MenuItem>
              <MenuItem
                onClick={() => copyToClipboardName(currentMedia.media.imageUrl)}
              >
                <a
                  style={{ textDecoration: "none", color: "#000" }}
                  href="/ContractRewalTemplate.pdf"
                  download
                >
                  <Box display="flex" alignItems="center">
                    <IconButton size="small" color="error" sx={{ mx: 1 }}>
                      <FiDownload style={{ height: "20px", width: "20px" }} />
                    </IconButton>
                    <Typography variant="h5">Download</Typography>
                  </Box>
                </a>
              </MenuItem>
              <Divider />
              <MenuItem disabled>Share</MenuItem>
              <MenuItem
                onClick={() =>
                  setshareto({
                    open: true,
                    shareto: "Employee",
                    media: {
                      id: params.row.id,
                      name: params.row.fname,
                      imageUrl: params.row.fileurl,
                    },
                  })
                }
              >
                <Box display="flex" alignItems="center">
                  <IconButton size="small" color="primary" sx={{ mx: 1 }}>
                    <FiExternalLink style={{ height: "20px", width: "20px" }} />
                  </IconButton>
                  <Typography variant="h5">Employee</Typography>
                </Box>
              </MenuItem>
            </Menu>
            <ShareMedia
              shareto={shareto}
              setshareto={setshareto}
              getList={getList}
              onshare={onshare}
            />
          </>
        );
      },
    },
    {
      field: "Extract",
      headerName: "Extract",
      width: 80,
      renderCell: (params) => {
        return (
          <Tooltip title="Extract">
            <IconButton
              size="small"
              color="secondary"
              onClick={() => {
                handleClickOpen();
                setdialogval({ ...dialogval, tags: params.row.tags });
              }}
            >
              <FiUploadCloud style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "edit",
      headerName: "Edit",
      width: 80,
      renderCell: (params) => {
        return (
          <Tooltip title="Edit">
            <IconButton
              size="small"
              color="success"
              onClick={() => handleEditOpen(params.row, "public")}
            >
              <FiEdit2 style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 80,
      renderCell: (params) => {
        return (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDeleteRow1(params.row)}
            >
              <FiTrash style={{ height: "20px", width: "20px" }} />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  const [rows, setrows] = useState([
    {
      id: 1,
      fname: "Accounts payable Document",
      docID: "DOC1",
      vendName: "Al Humrani Fuchs Petroleum",
      tags: "Invoice",
      date: "2022-12-06",
      fileurl:
        "https://res.cloudinary.com/daxie0yfn/image/upload/v1669981185/contracts/invoice_e90s57.pdf",
    },
    {
      id: 2,
      fname: "Disclosure Document",
      docID: "DOC2",
      vendName: "Al Faisal Steel Industries",
      tags: "NDA",
      date: "2022-12-15",
      fileurl:
        "https://res.cloudinary.com/daxie0yfn/image/upload/v1669898876/contracts/DOC1_fisqno.pdf",
    },
  ]);
  const [rows1, setrows1] = useState([
    {
      id: 1,
      fname: "Turnover Report",
      docID: "DOC1",
      vendName: "Alsaleh Aluinium Raw Materials",
      tags: "Invoice",
      date: "2022-12-06",
      fileurl:
        "https://res.cloudinary.com/daxie0yfn/image/upload/v1669884664/contracts/Instructional_Guide_-_Turnover_Report_updated_08-06-20__TO_dbrqpd.pdf",
    },
  ]);

  const [relink, setRelink] = useState({});
  const onPDFSave = (file, url) => {
    setRelink({ ...relink, link: url });
  };

  const onSetValues = () => {
    console.log(dialogval, relink);
    setdialogval({
      ...dialogval,
      mediafontend: [relink.link],
      mediaBackend: [relink.link],
    });
  };
  const [openDialog, setopenDialog] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [searchval, setsearchval] = useState("");
  const [id, setid] = useState(rows.length);
  const [id1, setid1] = useState(rows1.length);

  const [dialogval, setdialogval] = useState({
    mediafontend: [
      "https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf",
    ],
    mediaBackend: [
      "https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf",
    ],
    tags: "Invoice",
    type: "private",
    docName: "",
    vendName: "",
    date: "",
  });
  const emptyDialogValue = async () => {
    await setdialogval({
      mediafontend: [
        "https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf",
      ],
      mediaBackend: [
        "https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf",
      ],
      tags: "Invoice",
      type: "private",
      docName: "",
      vendName: "",
      date: "",
    });
  };
  const handleClickDialog = async () => {
    await handleReset();
    await setopenDialog(true);
    await emptyDialogValue();
  };
  const [isUpadte, setisUpadte] = useState(false);
  const handleEditOpen = async (rowValue, type) => {
    await handleReset();
    setActiveStep(2);
    if (type == "private") {
      handleDeleteRow(rowValue);
    } else {
      handleDeleteRow1(rowValue);
    }
    setisUpadte(true);
    await setdialogval({
      fname: rowValue.fname,
      fileurl: rowValue.fileurl,
      tags: rowValue.tags,
      type: type == "private" ? "private" : "public",
      docName: rowValue.fname,
      vendName: rowValue.vendName,
      date: rowValue.date,
    });
    await setopenDialog(true);
  };

  const handleCloseDialog = async () => {
    if (isUpadte) {
      handleAddDetails();
      setisUpadte(false);
    }
    await setopenDialog(false);
    await emptyDialogValue();
  };

  const handleAddDetails = async () => {
    console.log(dialogval);
    let result = [];
    if (isUpadte) {
      setisUpadte(false);
      if (dialogval.type == "private") {
        result.push({
          id: id + 1,
          docID: `DOC${id + 1}`,
          fname: dialogval.fname,
          tags: dialogval.tags,
          fileurl: dialogval.fileurl,
          fname: dialogval.docName,
          vendName: dialogval.vendName,
          date: dialogval.date,
        });
        await setrows([...rows, ...result]);
        await setid(id + result.length);
        await emptyDialogValue();
        await setopenDialog(false);
      } else {
        result.push({
          id: id1 + 1,
          docID: `DOC${id + 1}`,
          fname: dialogval.fname,
          tags: dialogval.tags,
          fileurl: dialogval.fileurl,
          fname: dialogval.docName,
          vendName: dialogval.vendName,
          date: dialogval.date,
        });
        await setrows1([...rows1, ...result]);
        await setid1(id1 + result.length);
        await emptyDialogValue();
        await setopenDialog(false);
      }
    } else {
      if (dialogval.type == "private") {
        for (let i = 0; i < dialogval.mediafontend.length; i++) {
          result.push({
            id: id + 1 + i,
            docID: `DOC${id + 1}`,
            fname: dialogval.mediafontend[i].name,
            tags: dialogval.tags,
            fileurl: dialogval.mediafontend[i],
            fname: dialogval.docName,
            vendName: dialogval.vendName,
            date: dialogval.date,
          });
        }
        await setrows([...rows, ...result]);
        await setid(id + result.length);
        await emptyDialogValue();
        await setopenDialog(false);
      } else {
        for (let i = 0; i < dialogval.mediafontend.length; i++) {
          result.push({
            id: id1 + 1 + i,
            docID: `DOC${id + 1}`,
            fname: dialogval.mediafontend[i].name,
            tags: dialogval.tags,
            fileurl: dialogval.mediafontend[i],
            fname: dialogval.docName,
            vendName: dialogval.vendName,
            date: dialogval.date,
          });
        }
        await setrows1([...rows1, ...result]);
        await setid1(id1 + result.length);
        await emptyDialogValue();
        await setopenDialog(false);
      }
    }
  };
  const handleDeleteRow = async (row) => {
    console.log(row);
    let newRows = [...rows];
    newRows = newRows.filter((e) => e.id != row.id);
    newRows = newRows.map((e, i) => {
      e.id = i + 1;
      e.docID = `DOC${i + 1}`;
      return e;
    });
    await setrows([...newRows]);
    await setid(id - 1);
  };
  const handleDeleteRow1 = async (row) => {
    console.log(row);
    let newRows = [...rows1];
    newRows = newRows.filter((e) => e.id != row.id);
    newRows = newRows.map((e, i) => {
      e.id = i + 1;
      e.docID = `DOC${i + 1}`;
      return e;
    });
    await setrows1([...newRows]);
    await setid1(id1 - 1);
  };

  const [value, setValue] = React.useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const steps = ["Choose", "Add Document", "Add Doc. Detail"];
  const [activeStep, setActiveStep] = useState(0);
  const handleDiscount = (event2) => {
    setDiscount(event2.target.value);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };

  const [radioValue, setradioValue] = React.useState("normal");
  const [radioValueinner, setradioValueinner] = React.useState("template");
  const [templateval, settemplateval] = React.useState(
    "https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf"
  );
  const [editContract, seteditContract] = React.useState(false);

  const handleSteps = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ px: 2, py: 4 }}>
            <FormControl sx={{ px: 2 }}>
              <RadioGroup
                aria-labelledby="contract-radio-buttons-group"
                name="contract-radio-buttons-group"
                value={radioValueinner}
                onChange={(event) => setradioValueinner(event.target.value)}
              >
                <FormControlLabel
                  value="template"
                  control={<Radio />}
                  label="From Template"
                />
                <FormControlLabel
                  value="contract"
                  control={<Radio />}
                  label="Upload from computer"
                />
              </RadioGroup>
            </FormControl>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ px: 2, py: 4 }}>
            {radioValueinner == "template" ? (
              <>
                <Grid
                  container
                  spacing={2}
                  sx={{ pb: 2 }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <Grid item xs={10} sm={10}>
                    <FormControl variant="outlined" sx={{ my: 1 }} fullWidth>
                      <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                        Choose Template
                      </CustomFormLabel>

                      <CustomSelectField
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={templateval}
                        onChange={(e) => {
                          settemplateval(e.target.value);
                          setdialogval({
                            ...dialogval,
                            mediaBackend: [e.target.value],
                            mediafontend: [e.target.value],
                          });
                        }}
                        fullWidth
                        size="small"
                      >
                        <MenuItem value="https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf">
                        NDA
                        </MenuItem>
                        <MenuItem value="https://res.cloudinary.com/daxie0yfn/image/upload/v1675351845/Billing_Document_90000011_53ca27c82d.pdf">
                        Invoice
                        </MenuItem>
                      </CustomSelectField>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2} sm={2}>
                    <>
                      <Tooltip title="Edit">
                        <IconButton
                          size="small"
                          sx={{
                            mt: 2,
                            borderRadius: "10px",
                            color: (theme) => theme.palette.success.main,
                            backgroundColor: (theme) =>
                              theme.palette.success.light,
                            p: 3,
                            "&:hover": {
                              backgroundColor: (theme) =>
                                theme.palette.success.main,
                              color: "white",
                            },
                          }}
                          onClick={() => {
                            setRelink({ ...dialogval });
                            seteditContract(true);
                          }}
                        >
                          <FiEdit2 style={{ height: "20px", width: "20px" }} />
                        </IconButton>
                      </Tooltip>
                      <EditContract
                        onPDFSave={onPDFSave}
                        onSetValues={onSetValues}
                        editContract={editContract}
                        seteditContract={seteditContract}
                        value={templateval}
                      />
                    </>
                  </Grid>
                </Grid>
                {/* <>
                  <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                    Upload Contract Document
                  </CustomFormLabel>
                  <CustomTextField
                    margin="dense"
                    size="small"
                    id="media"
                    type="file"
                    fullWidth
                    variant="outlined"
                    defaultValue={[]}
                    onChange={(e) => {
                      console.log(e.target.files);
                      let mediaList = [];
                      for (let i = 0; i < e.target.files.length; i++) {
                        mediaList.push({
                          id: "",
                          name: e.target.files[i].name,
                          imageUrl: URL.createObjectURL(e.target.files[i]),
                          loader: false,
                        });
                      }
                      setdialogval({
                        ...dialogval,
                        mediafontend: mediaList,
                        mediaBackend: e.target.files,
                      });
                    }}
                    multiple
                    inputProps={{
                      multiple: true,
                      accept:
                        "image/png,image/jpg,image/jpeg , .pdf , .xlsx , .docx , .doc , .pptx , .ppt",
                    }}
                  />
                </> */}
              </>
            ) : (
              <>
                <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                  Upload Document
                </CustomFormLabel>
                <CustomTextField
                  margin="dense"
                  size="small"
                  id="media"
                  type="file"
                  fullWidth
                  variant="outlined"
                  defaultValue={[]}
                  onChange={(e) => {
                    console.log(e.target.files);
                    let mediaList = [];
                    for (let i = 0; i < e.target.files.length; i++) {
                      mediaList.push({
                        id: "",
                        name: e.target.files[i].name,
                        imageUrl: URL.createObjectURL(e.target.files[i]),
                        loader: false,
                      });
                    }
                    setdialogval({
                      ...dialogval,
                      mediafontend: mediaList,
                      mediaBackend: e.target.files,
                    });
                  }}
                  multiple
                  inputProps={{
                    multiple: true,
                    accept:
                      "image/png,image/jpg,image/jpeg , .pdf , .xlsx , .docx , .doc , .pptx , .ppt",
                  }}
                />
              </>
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ py: 3, px: 2 }}>
            <CustomFormLabel sx={{ mt: 1 }} htmlFor="docName">
              Document Name
            </CustomFormLabel>
            <CustomTextField
              margin="dense"
              size="small"
              id="type"
              fullWidth
              variant="outlined"
              value={dialogval.docName}
              onChange={(e) => {
                setdialogval({
                  ...dialogval,
                  docName: e.target.value,
                });
              }}
            ></CustomTextField>
            <CustomFormLabel sx={{ mt: 1 }} htmlFor="vendName">
              Vendor Name
            </CustomFormLabel>
            <CustomTextField
              margin="dense"
              size="small"
              id="type"
              fullWidth
              variant="outlined"
              value={dialogval.vendName}
              onChange={(e) => {
                setdialogval({
                  ...dialogval,
                  vendName: e.target.value,
                });
              }}
            ></CustomTextField>
            <CustomFormLabel sx={{ mt: 1 }} htmlFor="vendName">
              Date
            </CustomFormLabel>
            <CustomTextField
              type="date"
              margin="dense"
              size="small"
              id="type"
              fullWidth
              variant="outlined"
              value={dialogval.date}
              onChange={(e) => {
                setdialogval({
                  ...dialogval,
                  date: e.target.value,
                });
              }}
            ></CustomTextField>
            <CustomFormLabel sx={{ mt: 1 }} htmlFor="type">
              Type
            </CustomFormLabel>
            <CustomSelectField
              margin="dense"
              size="small"
              id="type"
              fullWidth
              variant="outlined"
              value={dialogval.type}
              onChange={(e) => {
                console.log(e.target.value);
                setdialogval({
                  ...dialogval,
                  type: e.target.value,
                });
              }}
            >
              {[
                { value: "private", label: "Private" },
                { value: "public", label: "Public" },
              ].map((option, i) => {
                return (
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
            <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
              Document Type
            </CustomFormLabel>
            <CustomSelectField
              margin="dense"
              size="small"
              id="type"
              fullWidth
              variant="outlined"
              value={dialogval.tags}
              onChange={(e) => {
                console.log(e.target.value);
                setdialogval({
                  ...dialogval,
                  tags: e.target.value,
                });
              }}
            >
              {[
                { value: "Invoice", label: "Invoice" },
                { value: "NDA", label: "NDA" },
              ].map((option, i) => {
                return (
                  <MenuItem key={i} value={option.value}>
                    {option.label}
                  </MenuItem>
                );
              })}
            </CustomSelectField>
          </Box>
        );
      default:
        break;
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const extractInvoice = [
    {
      vendor_number: "202",
      vendor_name: "Software Technology, LLC",
      invoice_date: "18/08/22",
      due_date: "23/08/22",
      invoice_amt: "239.00",
      net_amt: "239.00",
      description: "Software Maintenance Agreement Tabs3 Accounts Payable",
    },
    {
      vendor_number: "202",
      vendor_name: "Software Technology, LLC",
      invoice_date: "18/08/22",
      due_date: "23/08/22",
      invoice_amt: "239.00",
      net_amt: "239.00",
      description: "Software Maintenance Agreement Tabs3 Trust Accounting",
    },
    {
      vendor_number: "202",
      vendor_name: "Software Technology, LLC",
      invoice_date: "18/08/22",
      due_date: "23/08/22",
      invoice_amt: "800.00",
      net_amt: "800.00",
      description: "Software Maintenance Agreement PracticeMaster (9 Users)",
    },
    {
      vendor_number: "202",
      vendor_name: "Software Technology, LLC",
      invoice_date: "18/08/22",
      due_date: "23/08/22",
      invoice_amt: "105.00",
      net_amt: "105.00",
      description: "Software Maintenance Agreement Tabs3 Taskbill",
    },
    {
      vendor_number: "202",
      vendor_name: "Software Technology, LLC",
      invoice_date: "23/08/22",
      due_date: "28/08/22",
      invoice_amt: "205.00",
      net_amt: "205.00",
      description: "Purchase Tabs3 Device Interface Program",
    },
  ];
  const extractNDA = [
    {
      doc_date: "01/12/2022",
      dis_name: "KUPEX",
      dis_email: " disclosing@gmail.com  ",
      rec_name: "QPMC ",
      rec_email: " receiver@gmail.com   ",
    },
  ];
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="md"
        fullWidth="md"
        PaperProps={{
          style: { borderRadius: "20px", padding: "10px" },
        }}
      >
        <DialogTitle sx={{ fontSize: "16px" }}>
          {"Extract Template"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          {dialogval.tags === "Invoice" ? (
            <Grid container spacing={2}>
              {extractInvoice.map((row) => {
                return (
                  <Grid item xs={12} sm={12} md={6} sx={{ my: 1 }}>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      Vendor Number : {row.vendor_number}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      Vendor Name : {row.vendor_name}
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ my: 1 }}>
                      <Typography variant="h5">Invoice Date :</Typography>
                      <Chip
                        label={row.invoice_date}
                        color="success"
                        sx={{ borderRadius: "5px", mx: 1 }}
                      />
                    </Box>
                    <Box display="flex" alignItems="center" sx={{ my: 1 }}>
                      <Typography variant="h5">Due Date :</Typography>
                      <Chip
                        label={row.due_date}
                        color="error"
                        sx={{ borderRadius: "5px", mx: 1 }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      {" "}
                      Invoice Amount :{row.invoice_amt}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      {" "}
                      Net Amount :{row.net_amt}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      {" "}
                      Description :{row.description}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            <Grid container spacing={2}>
              {extractNDA.map((row) => {
                return (
                  <Grid item xs={12} sm={12} md={6} sx={{ my: 1 }}>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      Disclosing Name : {row.dis_name}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      Disclosing Email : {row.dis_email}
                    </Typography>
                    <Box display="flex" alignItems="center" sx={{ my: 0.5 }}>
                      <Typography variant="h5">Document Date :</Typography>
                      <Chip
                        label={row.doc_date}
                        color="success"
                        sx={{ borderRadius: "5px", mx: 1 }}
                      />
                    </Box>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      Receiver Name :{row.rec_name}
                    </Typography>
                    <Typography variant="h5" sx={{ my: 0.5 }}>
                      Receiver Email :{row.rec_email}
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
      <Grid container>
        <Grid
          item
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          lg={12}
          md={12}
          xs={12}
        >
          <Box>
            <TabContext value={value}>
              <Box>
                <TabList
                  onChange={handleChange}
                  sx={{
                    height: "60px",
                  }}
                  variant="scrollable"
                  scrollButtons={false}
                  aria-label="scrollable prevent tabs example"
                >
                  <Tab
                    sx={{
                      fontSize: "16px",
                      mx: 1,
                    }}
                    icon={<FiLock />}
                    iconPosition="start"
                    label="Private"
                    value="1"
                  />
                  <Tab
                    sx={{ fontSize: "16px", mx: 1 }}
                    icon={<GoGlobe />}
                    iconPosition="start"
                    label="Public"
                    value="2"
                  />
                </TabList>
              </Box>
            </TabContext>
          </Box>
          <Box display="flex" alignItems="center">
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
                  backgroundColor: (theme) => theme.palette.secondary.main,
                  "&:hover": {
                    backgroundColor: (theme) => theme.palette.secondary.dark,
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
              onClose={handleCloseDialog}
              maxWidth="sm"
              fullWidth="sm"
              fullScreen={false}
            >
              <DialogTitle sx={{ fontSize: "18px" }}>
                {isUpadte ? "Update" : "Add"} Document Details
              </DialogTitle>
              <Divider />
              <SimpleBar style={{ maxHeight: "350px" }}>
                {/* <DialogContent>
                  <CustomFormLabel sx={{ mt: 1 }} htmlFor="docName">
                    Document Name
                  </CustomFormLabel>
                  <CustomTextField
                    margin="dense"
                    size="small"
                    id="type"
                    fullWidth
                    variant="outlined"
                    value={dialogval.docName}
                    onChange={(e) => {
                      setdialogval({
                        ...dialogval,
                        docName: e.target.value,
                      });
                    }}
                  ></CustomTextField>
                  <CustomFormLabel sx={{ mt: 1 }} htmlFor="vendName">
                    Vendor Name
                  </CustomFormLabel>
                  <CustomTextField
                    margin="dense"
                    size="small"
                    id="type"
                    fullWidth
                    variant="outlined"
                    value={dialogval.vendName}
                    onChange={(e) => {
                      setdialogval({
                        ...dialogval,
                        vendName: e.target.value,
                      });
                    }}
                  ></CustomTextField>
                  <CustomFormLabel sx={{ mt: 1 }} htmlFor="type">
                    Type
                  </CustomFormLabel>
                  <CustomSelectField
                    margin="dense"
                    size="small"
                    id="type"
                    fullWidth
                    variant="outlined"
                    value={dialogval.type}
                    onChange={(e) => {
                      console.log(e.target.value);
                      setdialogval({
                        ...dialogval,
                        type: e.target.value,
                      });
                    }}
                  >
                    {[
                      { value: "private", label: "Private" },
                      { value: "public", label: "Public" },
                    ].map((option, i) => {
                      return (
                        <MenuItem key={i} value={option.value}>
                          {option.label}
                        </MenuItem>
                      );
                    })}
                  </CustomSelectField>
                  {!isUpadte && (
                    <>
                      <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                        Assets
                      </CustomFormLabel>
                      <CustomTextField
                        margin="dense"
                        size="small"
                        id="media"
                        type="file"
                        fullWidth
                        variant="outlined"
                        defaultValue={[]}
                        onChange={(e) => {
                          console.log(e.target.files);
                          let mediaList = [];
                          for (let i = 0; i < e.target.files.length; i++) {
                            mediaList.push({
                              id: "",
                              name: e.target.files[i].name,
                              imageUrl: URL.createObjectURL(e.target.files[i]),
                              loader: false,
                            });
                          }
                          setdialogval({
                            ...dialogval,
                            mediafontend: mediaList,
                            mediaBackend: e.target.files,
                          });
                        }}
                        multiple
                        inputProps={{
                          multiple: true,
                          accept:
                            "image/png,image/jpg,image/jpeg , .pdf , .xlsx , .docx , .doc , .pptx , .ppt",
                        }}
                      />
                    </>
                  )}
                  <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                    Tags
                  </CustomFormLabel>
                  <Autocomplete
                    multiple
                    id="tags-filled"
                    size="small"
                    options={[]}
                    value={dialogval.tags}
                    freeSolo
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Tooltip title={option} key={index}>
                          <Chip
                            variant="contained"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        </Tooltip>
                      ))
                    }
                    renderInput={(params) => (
                      <CustomTextField
                        {...params}
                        variant="outlined"
                        placeholder="tags"
                      />
                    )}
                    onChange={(e, value) => {
                      console.log(value);
                      setdialogval({
                        ...dialogval,
                        tags: value,
                      });
                    }}
                  />
                </DialogContent> */}
                <DialogContent>
                  <Box sx={{ width: "100%" }}>
                    <Stepper activeStep={activeStep}>
                      {steps.map((label, index) => {
                        const stepProps = {};
                        const labelProps = {};
                        return (
                          <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                          </Step>
                        );
                      })}
                    </Stepper>
                    {activeStep === steps.length ? (
                      <>
                        <Box
                          sx={{
                            m: 3,
                            p: 2,
                            mt: 8,
                            backgroundColor: "primary.light",
                            borderRadius: 1,
                          }}
                          textAlign="center"
                        >
                          All steps completed - Now you can add document !!
                        </Box>
                      </>
                    ) : (
                      <>
                        <Box>{handleSteps(activeStep)}</Box>
                      </>
                    )}
                  </Box>
                </DialogContent>
              </SimpleBar>
              <DialogActions>
                {activeStep === steps.length ? (
                  <Box display="flex" sx={{ flexDirection: "row", p: 1 }}>
                    <Box sx={{ flex: "1 1 auto" }} />

                    <Button onClick={handleCloseDialog} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleAddDetails}
                      variant="contained"
                      color="success"
                    >
                      {isUpadte ? "Update Details" : "Add Details"}
                    </Button>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    sx={{ flexDirection: "row", p: 1 }}
                    justifyContent="normal"
                    width="100%"
                  >
                    <Button
                      color="inherit"
                      variant="contained"
                      disabled={activeStep === 0 || isUpadte}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: "1 1 auto" }} />
                    <Button onClick={handleCloseDialog} sx={{ mr: 1 }}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleNext}
                      variant="contained"
                      color={
                        activeStep === steps.length - 1
                          ? "success"
                          : "secondary"
                      }
                    >
                      {activeStep === steps.length - 1 ? "Complete" : "Next"}
                    </Button>
                  </Box>
                )}
                {/* <Button onClick={handleCloseDialog}>Cancel</Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleAddDetails}
                >
                  {isUpadte ? "Update Details" : "Add Details"}
                </Button> */}
              </DialogActions>
            </Dialog>
          </Box>
        </Grid>
      </Grid>
      <TabContext value={value}>
        <TabPanel value="1" sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <div style={{ display: "flex", height: "450px" }}>
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
                  disableSelectionOnClick
                  rows={rows.filter((e) =>
                    e.fname
                      .toLocaleLowerCase()
                      .includes(searchval.toLocaleLowerCase())
                  )}
                  columns={columns}
                />
              </div>
            </CardContent>
          </Card>
        </TabPanel>
        <TabPanel value="2" sx={{ width: "100%" }}>
          <Card>
            <CardContent>
              <div style={{ display: "flex", height: "450px" }}>
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
                  disableSelectionOnClick
                  rows={rows1.filter((e) =>
                    e.fname
                      .toLocaleLowerCase()
                      .includes(searchval.toLocaleLowerCase())
                  )}
                  columns={columns1}
                />
              </div>
            </CardContent>
          </Card>
        </TabPanel>
      </TabContext>
    </>
  );
};

export default Index;
