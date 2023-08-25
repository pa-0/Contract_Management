import React, { useState } from "react";
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  InputAdornment, 
  Tooltip,
  Typography,
  Divider,
  Button, 
  Box,
} from "@mui/material";
import CustomTextField from "@/ReusableComponets/forms/CustomElements/CustomTextField";
import CustomFormLabel from "@/ReusableComponets/forms/CustomElements/CustomFormLabel";
import CustomDataGrid from "@/ReusableComponets/CustomDataGrid/CustomDataGrid";
import {
  FiEdit,
  FiExternalLink,
  FiSearch,
  FiTrash,
  FiXCircle,
} from "react-icons/fi";
import { AiOutlineFolderOpen, AiOutlinePlus } from "react-icons/ai";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import dynamic from "next/dynamic";
const EditContract = dynamic(() => import("@/Components/EditContract/EditContract"), {
  ssr: false,
});
import PreviewMedia from "@/ReusableComponets/PreviewMedia/PreviewMedia";

const DocTemplate = () => {
  const [preview, setpreview] = useState({ open: false, value: "" });
  const columns = [
    { field: "id", headerName: "S.No.", width: 90 },
    { field: "name", headerName: "Name", width: 150 },
    {
      field: "preview",
      headerName: "Preview",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Tooltip title="Preview">
              <IconButton
                size="small"
                color="success"
                onClick={() =>
                  setpreview({ open: true, value: params.row.link })
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
      field: "Edit",
      headerName: "Edit",
      width: 120,
      renderCell: (params) => {
        return (
          <Tooltip title="Edit">
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
          </Tooltip>
        );
      },
    },
    {
      field: "Delete",
      headerName: "Delete",
      width: 120,
      renderCell: (params) => {
        return (
          <Tooltip title="Delete">
            <IconButton
              size="small"
              sx={{
                color: (theme) => theme.palette.grey.A200,
              }}
              onClick={() => handleDeleteRow(params.row)}
            >
              <FiTrash />
            </IconButton>
          </Tooltip>
        );
      },
    },
  ];
  const [editContract, seteditContract] = React.useState(false);
  const [openDialog, setopenDialog] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [isUpdate, setisUpdate] = useState(false);
  const [searchval, setsearchval] = useState("");
  const [id, setid] = useState(2);
  const [rows, setrows] = useState([
    {
      id: 1,
      name: "NDA",
      link: "https://res.cloudinary.com/daxie0yfn/image/upload/v1669883304/contracts/dummy_Non-Disclosure-Agreement_x5hpif.pdf",
    },
    {
      id: 2,
      name: "Invoice",
      link: "https://res.cloudinary.com/daxie0yfn/image/upload/v1675351845/Billing_Document_90000011_53ca27c82d.pdf",
    },
    {
      id: 3,
      name: "Framework Agreement",
      link: "https://res.cloudinary.com/daxie0yfn/image/upload/v1676117139/Construction-Framework_ordo91.pdf",
    },
  ]);

  const [dialogval, setdialogval] = useState({
    id: id + 1,
    name: "",
    link: "",
  });
  const emptyDialogValue = async () => {
    await setdialogval({
      id: id + 1,
      name: "",
      link: "",
    });
  };

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
    // await emptyDialogValue();
  };

  const handleAddDetails = async () => {
    console.log(dialogval);
    await setrows([...rows, dialogval]);
    await setid(id + 1);
    await emptyDialogValue();
    await setopenDialog(false);
  };
  const handleUpdateDetails = async () => {
    const newRows = [...rows]; // got error
    console.log(dialogval);
    let index = newRows.findIndex((ele) => ele.id == dialogval.id);
    console.log(dialogval.id);
    console.log(newRows[index]);
    newRows[index] = dialogval;
    console.log(newRows);
    await setrows([...newRows]);
    await emptyDialogValue();
    await setisUpdate(false);
    await setopenDialog(false);
  };
  const handleDeleteRow = async (row) => {
    let newRows = [...rows];
    console.log(row.id);
    newRows = newRows.filter((e) => e.id != row.id);
    newRows = newRows.map((e, i) => {
      e.id = i + 1;
      return e;
    });
    await setrows([...newRows]);
    await setid(id - 1);
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [relink, setRelink] = useState({});
  const onPDFSave = (file, url) => {
    setRelink({ ...relink, link: url });
  };

  const onSetValues = () => {
    console.log(dialogval, relink);
    setdialogval({ ...dialogval, link: relink.link });
  };

  return (
    <>
      <Typography
        variant="h5"
        color="gray"
        sx={{ p: 3, pb: 1, pt: 1 }}
        data-aos="zoom-in-up"
      >
        Document Template
      </Typography>
      <Dialog
        open={open}
        PaperProps={{
          style: {
            padding: "10px",
          },
        }}
        onClose={handleClose}
        fullScreen
      >
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <DialogTitle sx={{ fontSize: "16px" }}>
            {"Create Template"}
          </DialogTitle>
          <IconButton size="small" onClick={handleClose}>
            <FiXCircle />
          </IconButton>
        </Box>
        <Divider />
        <DialogContent>hiii</DialogContent>
      </Dialog>
      <Card>
        <CardContent>
          <Grid container sx={{ pb: 2 }}>
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
              {openDialog && (
                <Dialog
                  PaperProps={{
                    style: {
                      borderRadius: "20px",
                      padding: "10px",
                    },
                  }}
                  open={openDialog}
                  onClose={handleCloseDialog}
                  maxWidth="sm"
                  fullWidth="sm"
                >
                  <DialogTitle sx={{ fontSize: "18px" }}>
                    {" "}
                    {isUpdate ? "Update" : "Add"} Template Details
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                      Template Name
                    </CustomFormLabel>
                    <CustomTextField
                      autoFocus
                      size="small"
                      margin="dense"
                      id="name"
                      type="text"
                      fullWidth
                      variant="outlined"
                      value={dialogval.name}
                      onChange={(e) => {
                        setdialogval({ ...dialogval, name: e.target.value });
                      }}
                    />
                    <CustomFormLabel sx={{ mt: 1 }} htmlFor="Name">
                      Document
                    </CustomFormLabel>
                    <Button
                      onClick={() => {
                        setRelink({ ...dialogval });
                        seteditContract(true);
                      }}
                      color="primary"
                      variant="contained"
                      sx={{ my: 1 }}
                      startIcon={<FiExternalLink sx={{ mx: 1 }} />}
                    >
                      {!isUpdate ? "Create Template" : "Update Template"}
                    </Button>
                    <EditContract
                      onSetValues={onSetValues}
                      editContract={editContract}
                      seteditContract={seteditContract}
                      onPDFSave={onPDFSave}
                      value={!isUpdate ? "/files/blank.pdf" : dialogval.link}
                    />
                  </DialogContent>
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
              )}
            </Grid>
          </Grid>
          <div style={{ display: "flex", height: "400px" }}>
            <CustomDataGrid
              sx={{ border: "none", color: "#000" }}
              disableSelectionOnClick
              rows={rows.filter((e) =>
                e.name
                  .toLocaleLowerCase()
                  .includes(searchval.toLocaleLowerCase())
              )}
              columns={columns}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default DocTemplate
