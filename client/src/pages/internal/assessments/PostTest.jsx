import React, { useEffect, useState } from 'react'
import { Question } from '../../../components/shared/assessments/Question'
import axios from 'axios'
import { Button } from '@material-tailwind/react'
import { useFormik } from 'formik'
import Loading from '../../../components/shared/Loading'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import {DialogAlert} from '../../../components/DialogAlert'
import { DialogGreet } from '../../../components/DialogGreeting'
import { useNavigate } from 'react-router-dom'

export const PostTest = () => {
  const redirect = useNavigate()
  const id = localStorage.getItem("id")
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(true)
  const [message, setMessage] = useState("")
  const [message2, setMessage2] = useState("Welcome Grade 8 Learner! Let's see the results of your Personalized Learning Journey!")
  const [greet, setGreet] = useState("")
  const [greet2, setGreet2] = useState("Welcome Learner!")
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const token = localStorage.getItem('token')

  const handleOpen = () => setOpen2(!open2)

  const [loadingOpen, setLoadingOpen] = useState(false)

  useEffect(() => {
    const mastery = localStorage.getItem("mastery")

    if (parseFloat(mastery) !=  7.1 ) {
      redirect('/classroom')
    }
    axios.get("https://malms8.pythonanywhere.com/api/questions/1/random_order/", {
      headers: {
        Authorization: "Token " + token,
      }
    }).then((response) => {
      setQuestions(response.data)
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })


  }, [])


  const formik = useFormik({
    initialValues: {
      key0: "", key1: "", key2: "", key3: "", key4: "", key5: "", key6: "", key7: "", key8: "", key9: "", key10: "",
      key11: "", key12: "", key13: "", key14: "", key15: "", key16: "", key17: "", key18: "", key19: "", key20: "",
      key21: "", key22: "", key23: "", key24: "", key25: "", key26: "", key27: "", key28: "", key29: "", key30: "",
      key31: "", key32: "", key33: "", key34: "", key35: "", key36: "", key37: "", key38: "", key39: "", key40: "",
      key41: "", key42: "", key43: "", key44: "", key45: "", key46: "", key47: "", key48: "", key49: ""
    },

    enableReinitialize : true,

    onSubmit: values => {
      setLoadingOpen(true)

      let points = 0
      questions.forEach((question, key2) => {
        let current_key = "key" + key2

        Object.keys(values).forEach(key => {

          if (key == current_key) {
            // console.log(`${key}: ${values[key]} || ${question.answer}`);
            if (values[key] === question.answer) {

              points += 1

              // console.log(`${key}: ${values[key]} || ${question.answer} || correct || ${points}`);
              
            } else {
              // console.log(`${key}: ${values[key]} || ${question.answer} || wrong`);
            }
          }  
        });
      });

      setTimeout(() => {
        setLoadingOpen(false)

        setGreet("Great work!")
        setMessage("Congratulations! You've successfully completed the last test, well done on your achievement!")
        setOpen(true)
        
      }, 2000);
      
      // console.log(points)
      setScore(points)
      let mastery = 1.1

      if (points <= 30) {
        mastery = 1.1
      } else if(points <= 45 && points > 30 ) {
        mastery = 2.1
      } else if(points > 45 && points <= 50) {
        mastery = 3.1
      }

      axios.patch(`http://localhost:8000/api/users/${id}/`, { mastery: 8, posttest: points }, {
        headers: {
          Authorization: "Token " + token,
        }
      }).then((response) => {
        console.log("success")
        
        localStorage.setItem("mastery", response.data.mastery)

      }).catch((err) => {
        console.log(err)
      })

      // post score

    }

  })

  return (
    <div className='max-w-screen-xl mx-auto p-5 animate-fade'>
        <p className='text-xl uppercase font-bold text-center'>Pre Diagnostic Assessment</p>
        <p className='bg-light-blue-50 border-s-4 border-blue-700 p-8 my-6 text-blue-gray-800 text-center rounded-md drop-shadow'><span className='uppercase font-bold px-3'>Directions:</span> Choose the letter of the correct answer.</p>

        <form className='my-16' onSubmit={formik.handleSubmit}>
            {
              questions.map((question, key) => {
                return (
                <div className='p-16 bg-white rounded-md drop-shadow mb-8' key={key}>
                  <p className='my-3 text-lg tracking-wide text-blue-gray-900'>{key+1}. {question.question}</p>
                  <Question formik={formik} name={"key" + key } opt1={question.a} opt2={question.b} opt3={question.c} opt4={question.d} answ={question.answ}/>
                </div>
                )
              })
            }
            

            <p className='bg-light-blue-50 border-s-4 border-blue-700 p-8 my-6 text-blue-gray-800 text-center rounded-md drop-shadow'><span className='uppercase font-bold px-3'>reminders:</span> Please check all your answers before submitting thank you and goodluck learner!</p>

            <div className='flex justify-end'>
              <Button color='blue' type='submit' variant='gradient' className='w-1/2'>Submit</Button>
            </div>
            
        </form>

        <Loading loadingOpen={loadingOpen}/>

        <DialogAlert greet={greet} message={message} redirect={redirect} open={open} score={score} items={50}/>

        <DialogGreet greet={greet2} message={message2} handleOpen={handleOpen} open={open2} />
    </div>
  )
}
