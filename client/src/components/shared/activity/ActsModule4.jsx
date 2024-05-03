import React, { useEffect, useState } from 'react'
import { Textarea, Button, Input, List, ListItem } from '@material-tailwind/react'
import qr from "../../../assets/optional_acts/main/module4/qr.png"
import imgs from "../../../assets/optional_acts/main/module4/img.png"
import img from "../../../assets/optional_acts/main/module4/given.png"
import axios from 'axios'


export const ActsModule4 = () => {

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
                    if (item.act_no == 7) {
                        setSubmitted(true)
                        
                    }
                    if (item.act_no == 8) {
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
                if (response.data.act_no == 7) {
                    setSubmitted(true)
                }
                if (response.data.act_no == 8) {
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
        <p className='text-base text-center  text-blue-gray-800 tracking-wide leading-7'><span className='font-bold text-lg'>Directions: </span>Analyze and answer the following questions. Write your answer on a bond paper. Scan it an upload in a PDF file to the submission bin.</p>
       
       <div className='w-2/3 mx-auto'>
              <List className='tracking-wide leading-loose'>
                  <ListItem>A. Identify the parts of a monomial in the given.</ListItem>
                  
              </List>
       </div>

       <div className='my-3'>
            <img className='mx-auto block' src={img} alt="img" />
       </div>

       <div className='w-2/3 mx-auto'>
              <List className='tracking-wide leading-loose'>
                  <ListItem>1. Coefficient:</ListItem>
                  <ListItem>2. Variable:</ListItem>
                  <ListItem>3. Exponents:</ListItem>
                  
              </List>
       </div>

       <div className='w-2/3 mx-auto my-3'>
              <List className='tracking-wide leading-loose'>
                  <ListItem>B. Answer each question with a minimum of 5 sentences:</ListItem>
                  
              </List>
       </div>

       <div className='w-2/3 mx-auto'>
              <List className='tracking-wide leading-loose'>
                  <ListItem>1. How do we add monomials?</ListItem>                  
              </List>
       </div>
        

       
       <form encType='multipart/form-data' className='w-1/2 grid grid-cols-1 gap-7 mx-auto py-8'>
            <Input type='file' disabled={submitted} label='Upload File Here' name='files' onChange={(e) => { setFileData(e.target.files[0]) }} success={submitted} required/>
            <Button type='button' onClick={() => save_act(7)} disabled={submitted} loading={loading}>Submit</Button>
       </form>


        <p className='text-sm mt-8 uppercase text-green-600 border border-green-600 inline-block px-5 py-2 rounded-lg mb-4'>Optional Activity</p>
        <p className='text-base text-center  text-blue-gray-800 tracking-wide leading-7'><span className='font-bold text-lg'>Directions: </span>Access the link or scan the QR code below to redirect you in the activity. Once you’re done, take a screenshot and upload it to the submission bin.</p>

        <div className='grid grid-cols-1 gap-5 items-center justify-center justify-items-center mb-8'>
            <img src={imgs} alt={imgs} />
            <a target='_blank' className='bg-green-700 text-white px-8 py-2 rounded drop-shadow hover:bg-white hover:text-green-700 border-4 border-green-700 transition-all' href="https://quizizz.com/embed/quiz/6559a8fc3cb2a64e800f61be">Click to Play</a>
            <img src={qr} alt={qr} />
        </div>

        <form encType='multipart/form-data' className='w-1/2 grid grid-cols-1 gap-7 mx-auto py-8'>
            <Input type='file' disabled={submitted2} label='Upload File Here' name='files' onChange={(e) => { setFileData(e.target.files[0]) }} success={submitted2} required/>
            <Button type='button' onClick={() => save_act(8)} disabled={submitted2} loading={loading}>Submit</Button>
       </form>

    </div>
  )
}
