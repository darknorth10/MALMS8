import React, { useEffect, useState } from 'react'
import { Question } from '../../../../components/shared/assessments/Question'
import axios from 'axios'
import { Button } from '@material-tailwind/react'
import { useFormik } from 'formik'
import Loading from '../../../../components/shared/Loading'
import {DialogAlert} from '../../../../components/DialogAlert'
import { DialogGreet } from '../../../../components/DialogGreeting'
import { useNavigate, useParams } from 'react-router-dom'

export const Mastery = () => {
  const { mastery } = useParams()
  const redirect = useNavigate()
  const id = localStorage.getItem("id")
  const [open, setOpen] = useState(false)
  const [open2, setOpen2] = useState(true)
  const [message, setMessage] = useState("")
  const [message2, setMessage2] = useState("Welcome Grade 8 Learner! Let's check your level mastery knowledge!")
  const [greet, setGreet] = useState("")
  const [greet2, setGreet2] = useState("Welcome Learner!")
  const [score, setScore] = useState(0)
  const [questions, setQuestions] = useState([])
  const token = localStorage.getItem('token')
  const [assessmentLevel, setAssessmentLevel] = useState()
  const handleOpen = () => setOpen2(!open2)

  const [loadingOpen, setLoadingOpen] = useState(false)

  useEffect(() => {
    axios.get(`https://malms8.pythonanywhere.com/api/assessments/${mastery}/`, {
      headers: {
        Authorization: "Token " + token,
      }
    }).then((response) => {

      if (localStorage.getItem("mastery") != response.data.level) {
        redirect('/classroom')
      } else {
        setAssessmentLevel(parseFloat(response.data.level))
      } 


    }).catch((err) => {
      console.log(err)
    })

    axios.get(`https://malms8.pythonanywhere.com/api/questions/${mastery}/assessment/`, {
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
      key0: "", key1: "", key2: "", key3: "", key4: "", key5: "", key6: "", key7: "", key8: "", key9: "", 
      key10: "", key11: "", key12: "", key13: "", key14: "", key15: "", key16: "", key17: "", key18: "", key19: "", 
      key20: "", key21: "", key22: "", key23: "", key24: "", key25: "", key26: "", key27: "", key28: "", key29: "", 
      key30: "", key31: "", key32: "", key33: "", key34: ""
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

      // console.log(assessmentLevel)
      
      // console.log(points)
      setScore(points)

      let mastery_level = assessmentLevel
      
      if (points <= 27) {

        setMessage("It's okay, you're making progress! Let's work together to improve and try again.")

        switch (mastery_level) {
          
          case 1.8:
            mastery_level = 4.1
            break;

          case 2.8:
            mastery_level = 5.1
            break;

          case 3.8:
            mastery_level = 6.1
            break;
        
          default:
            break;
        }

        axios.patch(`http://localhost:8000/api/users/${id}/`, { mastery: mastery_level }, {
          headers: {
            Authorization: "Token " + token,
          }
        }).then((response) => {
          localStorage.setItem("mastery", response.data.mastery)
          // console.log(response)
        })
        

      } else if(points >= 28 ) {
        setGreet("")
        setMessage("Congratulations! You're now ready to move on to next level, keep up the good work!")

        // mastery_level =  (mastery_level + 0.1).toFixed(1)

        switch (mastery_level) {
          
          case 1.8:
            mastery_level = 2.1
            break;

          case 2.8:
            mastery_level = 3.1
            break;

          case 3.8:
            mastery_level = 7.1
            break;
        
          default:
            break;
        }
        console.log(mastery_level)

        let data = {  
          score: points,
          student: localStorage.getItem("id"),
          remarks: "passed",
          assessment: mastery
        }

        axios.post(`http://localhost:8000/api/scores/`, data, {
          headers: {
            Authorization: "Token " + token,
          }
        }).then((response) => {

        axios.patch(`http://localhost:8000/api/users/${id}/`, { mastery: mastery_level }, {
          headers: {
            Authorization: "Token " + token,
          }
        }).then((response) => {
          localStorage.setItem("mastery", response.data.mastery)
          // console.log(response)
        })

      }).catch((err) => {
        console.log(err)
      })

      }

      setTimeout(() => {
        setLoadingOpen(false)
        
        
        setOpen(true)
        
      }, 2000);

      

    }

  })

  return (
    <div className='max-w-screen-xl mx-auto p-5 animate-fade'>
        <p className='text-xl uppercase font-bold text-center'>Level Mastery Examination</p>
        <p className='bg-light-blue-50 border-s-4 border-blue-700 p-8 my-6 text-blue-gray-800 text-center rounded-md drop-shadow'><span className='uppercase font-bold px-3'>Directions:</span> Analyze and answer the questions below. Select the letter that corresponds to your answer.</p>

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
        <DialogAlert greet={greet} message={message} redirect={redirect} open={open} score={score} items={35}/>

        <DialogGreet greet={greet2} message={message2} handleOpen={handleOpen} open={open2} />
    </div>
  )
}
