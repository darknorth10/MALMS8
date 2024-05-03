import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logo from "../../assets/img/malms8_logo.png"
import bgImg from "../../assets/img/login_image.jpg"
import { Link as Link2 } from "react-router-dom"
import { useFormik } from 'formik';
import axios from 'axios';
import { useState } from 'react';
import Loading from '../../components/shared/Loading';
import { AlertBox } from '../../components/shared/AlertBox';
import { useNavigate } from 'react-router-dom';
import malms8 from "../../assets/img/malms8.jpg"

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="#">
        MALMS8
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export const Signin = () => {
  
  const initialValues = {
    lrn: '',
    password: '',
  }

    // alert
    const [showAlert, setShowAlert] = useState(false)
    const [alertText, setAlertText] = useState("")
    const [alertIcon, setAlertIcon] = useState("")
    const [alertStatus, setAlertStatus] = useState("")
    const [userCred, setUserCred] = useState({})
  
    // loading backdrop
    const [loadingOpen, setLoadingOpen] = useState(false);
    
    const handleClose = () => {
      setLoadingOpen(false);
    };
    const handleOpen = () => {
      setLoadingOpen(true);
    };


    const redirect = useNavigate()
    // login
  const onSubmit = (values) => {
    handleOpen()

    axios.post("http://127.0.0.1:8000/auth/token/login/", values, {})
    .then((response) => {
        
        let token = response.data.auth_token
        localStorage.setItem('token', token)
 

        setAlertStatus("success")
        setAlertText("Success: Redirecting...")
        setShowAlert(true)


        setTimeout(() => {

          handleClose()
          redirect("/dashboard")

        }, 1500);
        

    }).catch((err) => {
      setAlertStatus("error")
      setAlertText("Error: LRN/TID or Password is incorrect.")

      setTimeout(() => {
        formik.setErrors({
          password: "invalid password",
          lrn: "invalid lrn",
        })
        formik.values.password = ""
        
        handleClose()
        setShowAlert(true)
      }, 1000);
    })
  }

  const validate = values => {
    let errors = {}

    if (values.lrn == "") {
        errors.lrn = "Cannot be blank."
    }

    if (values.password == "") {
        errors.password = "Cannot be blank."
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '95vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={9}
          sx={{
            backgroundImage: `url(${malms8})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={3} component={Paper} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* show the alert */}
            {showAlert ? <AlertBox showAlert={showAlert} alertIcon={alertIcon} alertText={alertText} alertStatus={alertStatus} setShowAlert={setShowAlert}/> : null}
            
              <img src={logo} alt='logo'/>
         
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={formik.handleSubmit}  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="lrn"
                label="LRN or TID"
                name="lrn"
                autoFocus
                onChange={formik.handleChange}
                value={formik.values.lrn}
                error={formik.touched.lrn && Boolean(formik.errors.lrn)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
                error={formik.touched.password && Boolean(formik.errors.password)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}
                </Grid>
                <Grid item>
                  <Link2 to="/signup" className='text-blue-700 text-sm underline'>
                    {"Don't have an account? Sign Up"}
                  </Link2>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>


      <Loading loadingOpen={loadingOpen}/>
    </ThemeProvider>
  );
}