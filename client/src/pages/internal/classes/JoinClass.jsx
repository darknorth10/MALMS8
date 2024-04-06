import { useEffect, useState } from "react"
import { useOutletContext, useNavigate } from "react-router-dom"
import { Input, Button } from "@material-tailwind/react";
import { useFormik } from "formik";
import axios from "axios";
import { AlertBox } from "../../../components/shared/AlertBox";


export const JoinClass = () => {
    const [showAlert, setShowAlert] = useState()
    const [alertText, setAlertText] = useState("")
    const [alertStatus, setAlertStatus] = useState("")

    const token = localStorage.getItem('token')

    const redirect = useNavigate()

    const { setPagename, setCurrent, setLoadingOpen } = useOutletContext();
    useEffect(() => {
        // set page name
        setPagename("Join Class")

        // indicate that this is the current page
        setCurrent(true)

    }, [setPagename, setCurrent])


    const initialValues = {
        code: ''
    }

    const validate = values => {
        let errors = {}

        if (values.code == '') {
            errors.code = "Cannot be blank"
        }

        if (values.code.length > 6 || values.code.length < 6) {
            errors.code = "Code must be 6 digit."
        }

        return errors
    }

    const onSubmit = values => {
        
        axios.get(`http://127.0.0.1:8000/api/classes/${values.code}/code/`, {
            headers: {
                Authorization: `Token ${token}`
            }
        })
            .then((response) => {
                if (response.data.count == 1) {
                    console.log(response)

                    let id = localStorage.getItem('id')
                    
                    localStorage.setItem('class_id', response.data.results[0].id)

                    axios.patch(`http://localhost:8000/api/users/${id}/`, { class_id: response.data.results[0].id }, {
                        headers: {
                            Authorization: `Token ${token}`
                        }
                    })
                    .then((response) => {
                        setLoadingOpen(true)
                        
                        setTimeout(() => {
                            setLoadingOpen(false)
                            redirect('/classroom')
                        }, 1300);
                    })
                    .catch((err) => {
                        setAlertStatus("error")
                        setAlertText("Invalid class code.")
                        setShowAlert(true)
                    })


                }

                else if (response.data.count == 0) {

                    setAlertStatus("error")
                    setAlertText("Invalid class code.")
                    setShowAlert(true)

                    console.log(response)
                }
            })
            .catch((err) => {
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
        <>
            {showAlert && <AlertBox alertStatus={alertStatus} alertText={alertText} setShowAlert={setShowAlert} showAlert={showAlert} />}


            <div className="w-full h-[70vh] flex flex-col items-center justify-center rounded-lg p-8">
                <div className="w-full md:w-1/3 p-8 bg-white shadow-md rounded-md text-center">
                    <form onSubmit={formik.handleSubmit}>
                        <h4 className="font-bold uppercase text-blue-gray-800 pb-8 text-2xl">Join Class</h4>
                        <Input color="indigo" label="Enter Class Code"
                            name="code" value={formik.values.code} onChange={formik.handleChange}
                            error={Boolean(formik.errors.code)}
                        />

                        {formik.errors.code && <p className="text-sm text-red-600 p-2">* {formik.errors.code}</p>}

                        <Button type="submit" className="mt-5 text-center" fullWidth color="indigo" size="sm">Join</Button>
                    </form>
                </div>
            </div>
        </>
    )
}

