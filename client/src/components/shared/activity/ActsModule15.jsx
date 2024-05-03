import React, { useEffect, useState } from 'react'
import { Textarea, Button, Input, List, ListItem } from '@material-tailwind/react'
import imgs from "../../../assets/optional_acts/main/module15/img.png"
import imgs2 from "../../../assets/optional_acts/main/module15/img2.png"
import img from "../../../assets/optional_acts/main/module15/given.png"
import img1 from "../../../assets/optional_acts/main/module15/given2.png"
import img2 from "../../../assets/optional_acts/main/module15/given3.png"

import axios from 'axios'


export const ActsModule15 = () => {

    const [acts, setActs] = useState([])
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [submitted2, setSubmitted2] = useState(false)
    const [filedata, setFileData] = useState(null)
    const id = localStorage.getItem("id")

    useEffect(() => {
        axios.get(`http://localhost:8000/api/activities/${id}/user/`, {})
            .then((response) => {
                console.log(response.data)

                response.data.forEach((item, key) => {
                    if (item.act_no == 29) {
                        setSubmitted(true)
                        
                    }
                    if (item.act_no == 30) {
                        setSubmitted2(true)
                        
                    }
                    
                });

            }).catch((err) => {
                console.log(err)
            })

    }, [])


    const token = localStorage.getItem("token")
    const formData = new FormData();


    const save_act = (act_no) => {
        
        formData.append("files", filedata)
        formData.append("student", localStorage.getItem("id"))
        formData.append("act_no", act_no)
        formData.append("remarks", "submitted")

        if (filedata != null) {
            setLoading(true)
            axios.post("http://localhost:8000/api/activities/", formData, {
                headers: {
                    "Content-Type": 'multipart/form-data'
                }
            }).then((response) => {
                setLoading(false)
                if (response.data.act_no == 29) {
                    setSubmitted(true)
                }
                if (response.data.act_no == 30) {
                    setSubmitted2(true)
                }
                setFileData(null)
            }).catch((err) => {
                setLoading(false)
            })
        }

    }

  return (
    <div className='max-w-screen-2xl mx-auto'>
        <p className='text-sm uppercase text-blue-600 border border-blue-600 inline-block px-5 py-2 rounded-lg mb-4'>Required Activity</p>
        <p className='text-base text-center  text-blue-gray-800 tracking-wide leading-7'><span className='font-bold text-lg'>Directions: </span>Do the following activity. Submit your work in PDF/JPEG/PNG format to the
submission bin.</p>
   

       <div className='my-3 grid grid-cols-1'>
            <img className='mx-auto block' src={img} alt="img" />
            <img className='mx-auto block' src={img1} alt="img" />
            <img className='mx-auto block' src={img2} alt="img" />
            
       </div>


       
       <form encType='multipart/form-data' className='w-1/2 grid grid-cols-1 gap-7 mx-auto py-8'>
            <Input type='file' disabled={submitted} label='Upload File Here' name='files' onChange={(e) => { setFileData(e.target.files[0]) }} success={submitted} required/>
            <Button type='button' onClick={() => save_act(29)} disabled={submitted} loading={loading}>Submit</Button>
       </form>


        <p className='text-sm mt-8 uppercase text-green-600 border border-green-600 inline-block px-5 py-2 rounded-lg mb-4'>Optional Activity</p>


        <div className='grid grid-cols-1 gap-5 items-center justify-center justify-items-center mb-8 mt-4'>
            <img src={imgs} alt={imgs} />
            <img src={imgs2} alt={imgs2} />
            <a target='_blank' className='bg-green-700 text-white px-8 py-2 rounded drop-shadow hover:bg-white hover:text-green-700 border-4 border-green-700 transition-all' href="https://www.google.com/sheets/about/">Click to go to Sheets</a>

        </div>

        <form encType='multipart/form-data' className='w-1/2 grid grid-cols-1 gap-7 mx-auto py-8'>
            <Input type='file' disabled={submitted2} label='Upload File Here' name='files' onChange={(e) => { setFileData(e.target.files[0]) }} success={submitted2} required/>
            <Button type='button' onClick={() => save_act(30)} disabled={submitted2} loading={loading}>Submit</Button>
       </form>

    </div>
  )
}
