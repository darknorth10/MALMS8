import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import { PreTestRequired } from "./PreTestRequired";
import axios from "axios";



function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${id === open ? "rotate-180" : ""} h-5 w-5 transition-transform`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
    </svg>
  );
}
 
export const ModuleAccordion = () => {

  const [open, setOpen] = React.useState(0);
  const redirect = useNavigate()
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // fetch current student level
  const [userLevel, setUserLevel] = useState(0)
  
  useEffect(() => {

    axios.get("http://localhost:8000/auth/users/me/", {
      headers: {
        Authorization: "Token " + token,
      }
    }).then((response) => {
        setUserLevel(parseFloat(response.data.mastery))
        localStorage.setItem("mastery", response.data.mastery)
    }).catch((err) => {
      console.log(err)
    })


    let userlvl = parseFloat(localStorage.getItem("mastery"))

    if (userlvl > 1.0 && userlvl < 2.0 ) {
      setOpen(1)
    } else if (userlvl > 2.0 && userlvl < 3.0) {
      setOpen(2)
  
    } else if (userlvl > 3.0 && userlvl < 4.0) {
      setOpen(3)
    } 
    else {
      setOpen(0)
      console.log(userLevel)
    }

  }, [])

  const modules_mastery1 = [
    {
      module: 1,
      level: 1.1
    },
    {
      module: 2,
      level: 1.2
    },
    {
      module: 3,
      level: 1.3
    },
    {
      module: 4,
      level: 1.4
    },
    {
      module: 5,
      level: 1.5
    },
    {
      module: 6,
      level: 1.6
    },
    {
      module: 7,
      level: 1.7
    },
  ]

  const modules_mastery2 = [
    {
      module: 1,
      level: 2.1
    },
    {
      module: 2,
      level: 2.2
    },
    {
      module: 3,
      level: 2.3
    },
    {
      module: 4,
      level: 2.4
    },
    {
      module: 5,
      level: 2.5
    },
    {
      module: 6,
      level: 2.6
    },
    {
      module: 7,
      level: 2.7
    },
  ]

  const modules_mastery3 = [
    {
      module: 1,
      level: 3.1
    },
    {
      module: 2,
      level: 3.2
    },
    {
      module: 3,
      level: 3.3
    },
    {
      module: 4,
      level: 3.4
    },
    {
      module: 5,
      level: 3.5
    },
    {
      module: 6,
      level: 3.6
    },
    {
      module: 7,
      level: 3.7
    },
  ]

  // Supplementaary

  const supp_modules_mastery1 = [
    {
      module: 1,
      level: 4.1
    },
    {
      module: 2,
      level: 4.2
    },
    {
      module: 3,
      level: 4.3
    },
    {
      module: 4,
      level: 4.4
    },
    {
      module: 5,
      level: 4.5
    },
    {
      module: 6,
      level: 4.6
    },
    {
      module: 7,
      level: 4.7
    },
  ]

  const supp_modules_mastery2 = [
    {
      module: 1,
      level: 5.1
    },
    {
      module: 2,
      level: 5.2
    },
    {
      module: 3,
      level: 5.3
    },
    {
      module: 4,
      level: 5.4
    },
    {
      module: 5,
      level: 5.5
    },
    {
      module: 6,
      level: 5.6
    },
    {
      module: 7,
      level: 5.7
    },
  ]

  const supp_modules_mastery3 = [
    {
      module: 1,
      level: 6.1
    },
    {
      module: 2,
      level: 6.2
    },
    {
      module: 3,
      level: 6.3
    },
    {
      module: 4,
      level: 6.4
    },
    {
      module: 5,
      level: 6.5
    },
    {
      module: 6,
      level: 6.6
    },
    {
      module: 7,
      level: 6.7
    },
  ]
 
  return (
    <div className="max-w-screen-md mx-auto my-4 bg-white p-5 rounded drop-shadow-md animate-fade">

      { userLevel > 1 && userLevel < 4 || role != "student" ? <>
      <h2 className="uppercase p-3 text-center text-2xl text-blue-600">Main Modules</h2>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>

        <AccordionHeader onClick={() => handleOpen(1)}>Mastery Level 1</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">

            {modules_mastery1.map((item, key) => {

              if (userLevel && userLevel >= item.level || role != "student") {
                return (
                  <Button key={key} size="md" onClick={() => redirect(`/module/1/${item.module}`)} color="indigo" fullWidth>Competency Level {item.module}</Button>
                )
              } else {
                return (
                  <Button key={key} color="indigo" disabled fullWidth>Competency Level {item.module}</Button>
                )
              }
                
            })}


        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Mastery Level 2
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">

            {modules_mastery2.map((item, key) => {

              if (userLevel && userLevel >= item.level || role != "student") {
                return (
                  <Button key={key} onClick={() => redirect(`/module/2/${item.module}`)} color="green" fullWidth>Competency Level {item.module}</Button>
                )
              } else {
                return (
                  <Button color="green" key={key} disabled fullWidth>Competency Level {item.module}</Button>
                )
              }
                
            })}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Mastery Level 3
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">

            {modules_mastery3.map((item, key) => {

              if (userLevel && userLevel >= item.level || role != "student") {
                return (
                  <Button key={key} onClick={() => redirect(`/module/3/${item.module}`)} color="teal" fullWidth>Competency Level {item.module}</Button>
                )
              } else {
                return (
                  <Button color="teal" key={key} disabled fullWidth>Competency Level {item.module}</Button>
                )
              }
                
            })}

        </AccordionBody>
      </Accordion></>: 
      
      // Supplementary
      userLevel > 4 && userLevel < 7 ? <>
      <h2 className="uppercase p-3 text-center text-2xl text-blue-600">Supplementary Modules</h2>
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>

        <AccordionHeader onClick={() => handleOpen(1)}>Mastery Level 1</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">

            {supp_modules_mastery1.map((item, key) => {

              if (userLevel && userLevel >= item.level || role != "student") {
                return (
                  <Button key={key} size="md" onClick={() => redirect(`/module/4/${item.module}`)} color="indigo" fullWidth>Competency Level {item.module}</Button>
                )
              } else {
                return (
                  <Button key={key} color="indigo" disabled fullWidth>Competency Level {item.module}</Button>
                )
              }
                
            })}


        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Mastery Level 2
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
            {supp_modules_mastery2.map((item, key) => {

              if (userLevel && userLevel >= item.level && userLevel > 5) {
                return (
                  <Button key={key} onClick={() => redirect(`/module/5/${item.module}`)} color="green" fullWidth>Competency Level {item.module}</Button>
                )
              } else {
                return (
                  <Button color="green" key={key} disabled fullWidth>Competency Level {item.module}</Button>
                )
              }
                
            })}
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Mastery Level 3
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">

            {supp_modules_mastery3.map((item, key) => {

              if (userLevel && userLevel >= item.level && userLevel > 6) {
                return (
                  <Button key={key} onClick={() => redirect(`/module/6/${item.module}`)} color="teal" fullWidth>Competency Level {item.module}</Button>
                )
              } else {
                return (
                  <Button color="teal" key={key} disabled fullWidth>Competency Level {item.module}</Button>
                )
              }
                
            })}

        </AccordionBody>
      </Accordion>
      </>

      :

      userLevel == 7.1 ?

      <div className='grid grid-cols-1 gap-4 py-5'>
        <p className='w-2/3 font-semibold mx-auto mb-5 p-5 bg-teal-50 rounded border-s-4 border-teal-400'>
            <span className='uppercase me-2 text-teal-700 text-lg'>Note: </span>
            We are reaching the end of this course, please answer all the questions carefully. GOODLUCK LEARNER!
        </p>

        <Button variant='gradient' color='teal' className='w-2/3 mx-auto' onClick={() => redirect('/post_test')}>Take Post-Test Assessment</Button>
    </div>:
      
      userLevel == 8 ?
      <div>
        <h2 className="text-center text-teal-700 uppercase text-xl">You have finished the course, Congratulations!</h2>
      </div>:
      <PreTestRequired/> }

    </div>
  );
}