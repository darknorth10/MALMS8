/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik'
import axios from 'axios';

function generateRandomAlphanumeric(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

const randomString = generateRandomAlphanumeric(6);

export default function CreateClassDialog({open, handleClose, setLoadingOpen, setShowAlert, setAlertStatus, setAlertText, setHasClass}) {

  const initialValues = {
    name: '',
    code: randomString, 
    teacher: localStorage.getItem('email'),
    status: 'active'
  }

  const validate = values => {
    let errors = {} 

    if (values.name == '') {
      errors.name = 'Field cannot be empty'
    }

    return errors
  }

  const token = localStorage.getItem('token')

  const onSubmit = values => {

    handleClose()
    setLoadingOpen(true)

    axios.post('http://localhost:8000/api/classes/', values, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then((response) => {

      //console.log(response)
      let id  = localStorage.getItem('id')
      let class_id  = response.data.id
      localStorage.setItem('class_code', response.data.code)
      
      axios.patch(`http://localhost:8000/api/users/${id}/`, { class_id:class_id }, {
        
        headers: {
          Authorization: `Token ${token}`
        }

      })
      .then((response) => {

        setAlertStatus("success")

        setAlertText("Successfully created a class.")
        
        setTimeout(() => {

          setLoadingOpen(false)
          setShowAlert(true)
          
          

        }, 1300);

        setTimeout(() => {

          setHasClass('yes')

        }, 3000);

      }).catch((err) => {
        console.log(err)
      })

    }).catch((err) => {
      console.log(err)
    })

  }


  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize: true
  })

  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: formik.handleSubmit,
        }}
      >
        <DialogTitle>Create Class</DialogTitle>
        <DialogContent>
          <DialogContentText className='pb-8'>
            To add class to this website, please enter desired class information here.
          </DialogContentText>
          <TextField
            autoFocus
            
            margin="dense"
            name="name"
            label="Class Name"
            type="name"
            fullWidth
            variant="outlined"
            size='small'
            onChange={formik.handleChange}
            error={
              Boolean(formik.errors.name)
            }
          />
          {formik.errors.name && <p className='text-sm text-red-600 m-3'>* {formik.errors.name}</p>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}