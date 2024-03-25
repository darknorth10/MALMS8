import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';


export default function SignOutDialog({openSignout, handleSignoutClose, handleOpen, handleClose}) {

    const redirect = useNavigate()

    function handleSignout () {
        handleSignoutClose()
        handleOpen()
        localStorage.clear()

        setTimeout(() => {

            handleClose()
            redirect("/signin")

        }, 1500);
    }

  return (
    <React.Fragment>

      <Dialog
        open={openSignout}
        onClose={handleSignoutClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Do you really want to sign out?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            By clicking confirm your account will be signed out of the system.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSignoutClose}>Cancel</Button>
          <Button variant='contained' color='primary' onClick={handleSignout} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}