import React, { useEffect, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { IconButton, Typography } from "@mui/material";
import { FiX } from "react-icons/fi";
// import dynamic from "next/dynamic";
// const pathway = dynamic(()=>import("../../../../node_modules/@pdftron/webviewer/public") ,{ ssr:false})

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditContract({
  editContract,
  seteditContract,
  value,
  onPDFSave,
  onSetValues,
}) {
  const handleClose = () => {
    seteditContract(false);
    onSetValues();
  };

  const viewer = useRef(null);

  useEffect(() => {
    import("@pdftron/webviewer").then(() => {
      WebViewer(
        { 
          path: "/webviewer/lib/" /* ,
          initialDoc: "/files/blank.pdf", */,
        },
        viewer.current
      ).then((instance) => {
        instance.UI.loadDocument(value, { filename: value });
        instance.UI.enableFeatures([instance.Feature.ContentEdit]);
        instance.setToolbarGroup(instance.UI.ToolbarGroup.EDIT_TEXT);
        const { documentViewer, annotationManager, Annotations } =
          instance.Core;
        const widgetFlags = new Annotations.WidgetFlags();
        widgetFlags.set("Required", true);
        documentViewer.addEventListener("documentLoaded", () => {
          // perform document operations
        });
        // you can now call WebViewer APIs here...
        instance.UI.setHeaderItems((header) => {
          header.push({
            type: "actionButton",
            img: "/diskette (1).png",
            onClick: async () => {
              const doc = documentViewer.getDocument();
              const xfdfString = await annotationManager.exportAnnotations();
              const data = await doc.getFileData({
                // saves the document with annotations in it
                xfdfString,
              });
              console.log("pdf", data);
              const arr = new Uint8Array(data);
              const blob = new Blob([arr], { type: "application/pdf" });

              // Add code for handling Blob here
              const url = URL.createObjectURL(blob);
              onPDFSave(blob, url);
              //   window.open(url);
            },
          });
        });
      });
    });
  }, []);

  return (
    <Dialog
      PaperProps={{
        style: {
          borderRadius: "0px",
        },
      }}
      open={editContract}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      fullScreen
      aria-describedby="alert-dialog-slide-description"
      maxWidth="sm"
      fullWidth="sm"
    >
      <DialogTitle
        sx={{ fontSize: "18px" }}
        display="flex"
        justifyContent="space-between"
      >
        <Typography>Document</Typography>
        <IconButton size="small" onClick={handleClose}>
          <FiX />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: 0, overflow: "hidden" }}>
        <div
          className="webviewer"
          ref={viewer}
          style={{ height: "100vh" }}
        ></div>
      </DialogContent>
    </Dialog>
  );
}

export default EditContract;
