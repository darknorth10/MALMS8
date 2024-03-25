import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import { Link } from "react-router-dom"
import logo from "../../assets/img/malms8_logo.png"
import { useFormik } from "formik";
import axios from "axios";
import { AlertBox } from "../../components/shared/AlertBox";
import { useState } from "react";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import Loading from "../../components/shared/Loading";

export function Signup() {

  // formik initial values
  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    role: "student",
    lrn: "",
    password: "",
    re_password: "",
  }

  // form validations
  const validate = (values) => {
    let errors = {}
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (values.first_name == "") {
        errors.first_name = "First Name cannot be empty"
    }
    if (values.last_name == "") {
        errors.last_name = "Last Name cannot be empty"
    }

    if (values.lrn == "") {
        errors.lrn = "LRN / TID cannot be empty"
    }

    if (values.email == "") {
        errors.email = "Email cannot be empty."
    }


    if (values.password == "") {
      errors.password = "Password cannot be empty."
    }
    if (values.re_password == "") {
      errors.re_password = "Re Password cannot be empty."
    }

    if (values.password != values.re_password) {
      errors.re_password = "Passwords does not matched."
    }


    return errors;
    
  }

  // alert
  const [showAlert, setShowAlert] = useState(false)
  const [alertText, setAlertText] = useState("")
  const [alertIcon, setAlertIcon] = useState("")
  const [alertStatus, setAlertStatus] = useState("")

  // loading backdrop
  const [loadingOpen, setLoadingOpen] = useState(false);
  const handleClose = () => {
    setLoadingOpen(false);
  };
  const handleOpen = () => {
    setLoadingOpen(true);
  };

  // formik submit
  const onSubmit = (values) => {
    //console.log(values)
    handleOpen()

    axios.post("http://127.0.0.1:8000/auth/users/", values, {}).then(() => {

      console.log("success");
      formik.resetForm()

      setAlertStatus("success")
      setAlertText("Sucessfully Registered, please check your email for account activation.")

      setTimeout(() => {
        handleClose()
        setShowAlert(true)
      }, 2000);

    }).catch((err) => {

      setAlertStatus("error")
      setAlertText("Error: Email or LRN already exist.")

      setTimeout(() => {
        formik.setErrors({
          email: "invalid email",
          lrn: "invalid lrn",
        })
        formik.values.password = ""
        formik.values.re_password = ""
        handleClose()
        setShowAlert(true)
      }, 1000);

    })
    
  }


  // formik
  const formik = useFormik({
    initialValues,
    validate,
    onSubmit
  })


  return (
    <>
    {/* show the alert */}
    {showAlert ? <AlertBox showAlert={showAlert} alertIcon={alertIcon} alertText={alertText} alertStatus={alertStatus} setShowAlert={setShowAlert}/> : null}

     <Card color="white" className="max-w-screen-2xl md:w-1/3 mx-auto p-8 flex flex-col items-center md:mt-12 mb-10" shadow={false}>
      <img src={logo} alt="logo" className="h-28" />
      <Typography variant="h4" color="blue-gray">
        Sign Up
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Nice to meet you! Enter your details to register.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={formik.handleSubmit}>
        <div className="mb-1 flex flex-col gap-6">

          <Input variant="outlined" label="First Name" name="first_name" size="lg" placeholder="First Name" value={formik.values.first_name} onChange={formik.handleChange} error={formik.touched.first_name && Boolean(formik.errors.first_name)}/>

          <Input variant="outlined" label="Last Name" name="last_name" size="lg" placeholder="Last Name" value={formik.values.last_name} onChange={formik.handleChange} error={formik.touched.last_name && Boolean(formik.errors.last_name)}/>

          <Input variant="outlined" label="Email" type="text" name="email" value={formik.values.email} size="lg" placeholder="Email" onChange={formik.handleChange} error={formik.touched.email && Boolean(formik.errors.email)}/>

          <Select label="Select Role" name="role" value={formik.values.role} onChange={formik.handleChange} error={formik.touched.role && Boolean(formik.errors.role)}>
            <Option value="student">Student</Option>
            <Option value="teacher">Teacher</Option>
            
          </Select>

          <Input variant="outlined" label="LRN / TID" name="lrn" maxLength={20} size="lg" placeholder="LRN / TID" value={formik.values.lrn} onChange={formik.handleChange} error={formik.touched.lrn && Boolean(formik.errors.lrn)}/>

          <Input variant="outlined" type="password" label="Password" name="password" size="lg" placeholder="******" value={formik.values.password} onChange={formik.handleChange} error={formik.touched.password && Boolean(formik.errors.password)}/>
          <Input variant="outlined" type="password" label="Retype Password" name="re_password" size="lg" placeholder="******" value={formik.values.re_password} onChange={formik.handleChange} error={formik.touched.re_password && Boolean(formik.errors.re_password)}/>

        </div>
        
        <Button type="submit" className="mt-6" fullWidth>
          sign up
        </Button>
        <Typography color="gray" className="mt-4 text-center font-normal">
          Already have an account?{" "}
          <Link to="/signin" className="font-medium text-gray-900">
            Sign In
          </Link>
        </Typography>
      </form>
    </Card>
    

    <Loading loadingOpen={loadingOpen}/>

    </>
  );
}