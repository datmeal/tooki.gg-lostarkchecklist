import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Site Expiration</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Hello! I am Salty, the developer for tooki.gg!
          <br />
          Sadly, I cannot afford to keep paying for the domain name, so tooki.gg
          will go offline after 3/22/2023.
          <br />
          There are many alternatives out there, so I wanted to give you some
          time to be able to copy the information over if necessary.
          <br />
          <br />
          Thanks for using tooki.gg for the past year, and say hi to Artist for
          me ;-;
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
