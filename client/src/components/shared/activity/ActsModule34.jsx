import React, { useEffect, useState } from 'react'
import { Textarea, Button, Input, List, ListItem } from '@material-tailwind/react'
import qr from "../../../assets/optional_acts/main/module34/qr.png"
import imgs from "../../../assets/optional_acts/main/module34/img.png"


import axios from 'axios'


export const ActsModule34 = () => {

 
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
  
                    if (item.act_no == 55) {
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
 
                if (response.data.act_no == 55) {
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
 
        <p className='text-base text-center  text-blue-gray-800 tracking-wide leading-7'><span className='font-bold text-lg'>Directions: </span>Do the activity by visiting the provided link. Answer what is asked, and have fun while completing this. Take a screenshot or a print screen after you have finished it and upload it in the provided submission bin in a JPEG, PNG, or PDF file format.</p>

        <div className='grid grid-cols-1 gap-5 items-center justify-center justify-items-center mb-8'>
            <img src={imgs} alt={imgs} />
            <a target='_blank' className='bg-green-700 text-white px-8 py-2 rounded drop-shadow hover:bg-white hover:text-green-700 border-4 border-green-700 transition-all' href="https://view.genial.ly/660c14b364e0ec0014863d1c/interactive-content-dinosaurs-quiz-polynomial-multiplication">Click to Play</a>
            <img src={qr} alt={qr} />
        </div>

        <form encType='multipart/form-data' className='w-1/2 grid grid-cols-1 gap-7 mx-auto py-8'>
            <Input type='file' disabled={submitted2} label='Upload File Here' name='files' onChange={(e) => { setFileData(e.target.files[0]) }} success={submitted2} required/>
            <Button type='button' onClick={() => save_act(55)} disabled={submitted2} loading={loading}>Submit</Button>
       </form>

    </div>
  )
}
