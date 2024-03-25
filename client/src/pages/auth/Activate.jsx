import React, { useEffect } from 'react'
import Loading from '../../components/shared/Loading'
import { Spinner } from '@material-tailwind/react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import CheckCircle from '@mui/icons-material/CheckCircle'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import InfoIcon from '@mui/icons-material/Info';
import {Input} from '@material-tailwind/react'
import { useFormik, Form } from 'formik'


export const Activate = () => {

    const [loadingOpen, setLoadingOpen] = React.useState(true)
    const [status, setStatus] = React.useState(0)

    const { uid, token } = useParams()

    const redirect = useNavigate()
    
    const data = {
        uid: uid,
        token: token
    }

    useEffect(() => {
        
        axios.post("http://127.0.0.1:8000/auth/users/activation/", data, {} ).then((response) => {
            setLoadingOpen(false)
            setStatus(204)
        }).catch((err) => {
            console.log(err.response)

            if (err.response.status == 403) {
                setLoadingOpen(false)
                setStatus(403)
            }

            if (err.response.status == 400) {
                setLoadingOpen(false)
                setStatus(400)
            }
        })

    }, [])

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        onSubmit: (values) => {
            
            setLoadingOpen(true)

            axios.post("http://127.0.0.1:8000/auth/users/resend_activation/", values, {}).then((response) => {
                setLoadingOpen(false)
                setStatus(204)
                console.log(response)
            }).catch((err) => {
                setLoadingOpen(false)
                
                formik.errors.email = err.response.data.email
                console.log(err.response.data)
            })
        },

        validate : (values) => {
            let errors = {}

            if (values.email == "") {
                errors.email = "Required Field."
            }
            
            return errors
        },

        enableReinitialize: true,
  


    })





    
    return (
        <div className='max-w-screen-2xl p-10 mt-5 rounded bg-white shadow mx-auto'>

            {loadingOpen && status == 0  ? <h4 className='rounded shadow p-5 text-center bg-teal-500 flex items-center justify-center gap-8'>
                <Spinner />
                <p className='text-white uppercase tracking-wider'>Activating your account...</p></h4> : null}

            {!loadingOpen && status == 204 ? <>
                <h4 className='rounded p-5 text-center bg-blue-gray-900 flex items-center justify-center gap-8'>
                    <CheckCircle className='text-white h-9' />
                    <p className='text-white uppercase tracking-wider'>Activated</p></h4>

                <div className='flex justify-center mt-8'>
                    <Button variant='contained' size='large' fullWidth onClick={() => redirect('/signin')}>Go to Sign in</Button>
                </div>
            </>: null}

            {!loadingOpen && status == 400 ? <>
                <h4 className='rounded p-5 text-center bg-red-600 flex items-center justify-center gap-8'>
                    <CheckCircle className='text-white h-9' />
                    <p className='text-white uppercase tracking-wider'>Error Invalid Token</p></h4>

                <div className='flex justify-center mt-8'>
                    <Button variant='contained' size='large' fullWidth onClick={() => redirect('/signin')}>Go to Sign in</Button>
                </div>
            </>: null}

            { !loadingOpen && status == 403 ? <>
                <h4 className='rounded p-5 text-center bg-red-700 flex items-center justify-center gap-8'>
                    <InfoIcon className='text-white h-9' />
                    <p className='text-white uppercase tracking-wider'>Token Expired</p></h4>
                    <form className='p-8 md:w-1/2 mx-auto' onSubmit={formik.handleSubmit}>
                        
                        <Input name="email" type='email' label='Email Registered' value={formik.values.email} onChange={formik.handleChange} error={Boolean(formik.errors.email)} />

                        <div className='flex justify-end mt-8'>
                            <Button type='submit' variant='contained' size='large'>Resend Activation</Button>
                        </div>
                    </form>
            </>: null}





            <Loading loadingOpen={loadingOpen} />
        </div>
    )
}


