import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Input, Textarea } from '@material-tailwind/react';
import { useFormik } from 'formik';
import axios from 'axios';


export default function GradingDialog({open, setOpen, handleClickOpen, handleClose, data, notify, refresh}) {

    const formik = useFormik({
        initialValues: {
            grade: '',
            feedback: '',
            remarks: 'graded'
        },

        validate: values => {
            let errors = {}


            if (values.grade =="") {
                errors.grade = "required";
            }

            return errors;
        },


        onSubmit: values => {
            

            axios.patch(`http://localhost:8000/api/activities/${data.act}/`, values, {})
            .then((response) => {
                notify()
                handleClose()
                formik.resetForm()

                    axios.get(`http://localhost:8000/api/activities/${data.student}/user/`, {})
                    
                    .then((response) => {
                        refresh(response.data)
                        console.log(response.data)
                        console.log(id)
                    }).catch((err) => {
                        console.log(err)
                    })
                    
            }).catch((err) => {
                console.log(err)
            })
        },

        enableReinitialize: true,
    })
  return (
    <React.Fragment>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Activvity Grading Form"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           <div className="">
                <form className='p-5 grid grid-cols-1 gap-6' onSubmit={formik.handleSubmit}>
                    <Input type='number' min={0} color='blue' size='lg' className='text-center' label='Input Grade Here' name='grade' value={formik.values.grade} onChange={formik.handleChange} error={Boolean(formik.errors.grade)} autoFocus required/>

                    <Textarea color='blue' label='Feedback' name='feedback' value={formik.values.feedback} onChange={formik.handleChange} >

                    </Textarea>

                              <DialogActions>
                                  <Button onClick={handleClose}>Cancel</Button>
                                  <Button variant='contained' type="submit" autoFocus>
                                      Save
                                  </Button>
                              </DialogActions>
                </form>
           </div>
          </DialogContentText>
        </DialogContent>
        
      </Dialog>
    </React.Fragment>
  );
}
