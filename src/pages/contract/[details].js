import {
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Link,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";
import CustomFormLabel from "../../../src/components - Copy/ReusableComponets/forms/CustomFormLabel";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";

import TimelineDot from "@mui/lab/TimelineDot";
import { motion } from "framer-motion";
import { FiFile, FiXCircle } from "react-icons/fi";
import { AiFillFolderOpen } from "react-icons/ai";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const index = () => {
  const [open1, setOpen1] = React.useState(false);

  const handleClickOpen1 = () => {
    setOpen1(true);
  };

  const handleClose1 = () => {
    setOpen1(false);
  };
  return (
    <>
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
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h4" sx={{ my: 1 }} fontWeight="500">
                Primary Contract Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Box display="flex" flexDirection="column">
                    <CustomFormLabel sx={{ mt: 2 }} htmlFor="Name">
                      Contract Name :
                    </CustomFormLabel>
                    <Typography variant="h6" fontWeight="400">
                     Humrani Petroleum Contract
                    </Typography>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <CustomFormLabel sx={{ mt: 2 }} htmlFor="Name">
                      Contract Starting Date :
                    </CustomFormLabel>
                    <Box display="flex" alignItems="center">
                      <Chip
                        label="Dec 17 2018"
                        color="success"
                        sx={{ borderRadius: "5px" }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <CustomFormLabel sx={{ mt: 2 }} htmlFor="Name">
                      Contract Ending Date :
                    </CustomFormLabel>
                    <Box display="flex" alignItems="center">
                      <Chip
                        label="June 11 2022"
                        color="error"
                        sx={{ borderRadius: "5px" }}
                      />
                    </Box>
                  </Box>
                  <Box display="flex" flexDirection="column">
                    <CustomFormLabel sx={{ mt: 2 }} htmlFor="Name">
                      Owner :
                    </CustomFormLabel>
                    <Typography variant="h6" fontWeight="400">
                    Basrawi
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <ListItem
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ListItemAvatar>
                      <img
                        src="/contractIMG.png"
                        height="260px"
                        className="roundedCircle"
                      />
                    </ListItemAvatar>
                  </ListItem>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <Card>
            <CardContent>
              <ListItem
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h3" sx={{ mb: 2 }} fontWeight="500">
                  Partner Info
                </Typography>
                <ListItemAvatar>
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    width="60px"
                    height="60px"
                    className="roundedCircle"
                  />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  primary={
                    <Typography variant="h5" fontWeight="400">
                      Al Humrani Fuchs Petroleum Co.S.A.
                    </Typography>
                  }
                />
              </ListItem>
              <Box display="flex" flexDirection="column">
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="Name">
                  Email ID :
                </CustomFormLabel>
                <Typography variant="h6" fontWeight="400">
                Humrani@gmail.com
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column">
                <CustomFormLabel sx={{ mt: 2 }} htmlFor="Name">
                  Address :
                </CustomFormLabel>
                <Typography variant="h6" fontWeight="400">
                Prince Mohammed Bin Abdulaziz St, Al Andalus, Jeddah 23326, Saudi Arabia
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Card>
        <CardContent>
          <Typography variant="h4" sx={{ my: 1 }} fontWeight="500">
            Associated Document Details
          </Typography>
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
        </CardContent>
      </Card>
    </>
  );
};

export default index;
