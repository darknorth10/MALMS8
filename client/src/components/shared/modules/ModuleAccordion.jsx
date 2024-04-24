import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom'
 
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
  const redirect  = useNavigate()
 
  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  // fetch current student level
  const userLevel = 1.7

  useEffect(() => {
    if (userLevel > 1 && userLevel < 2) {
      setOpen(1)
    } else if (userLevel > 2 && userLevel < 3) {
      setOpen(2)
  
    } else if (userLevel > 3 && userLevel < 4) {
      setOpen(3)
    } 
    else {
      setOpen(0)
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
 
  return (
    <div className="max-w-screen-md mx-auto my-4">

      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>Mastery Level 1</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">

            {modules_mastery1.map((item, key) => {

              if (userLevel && userLevel >= item.level) {
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

              if (userLevel && userLevel >= item.level) {
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

              if (userLevel && userLevel >= item.level) {
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
      </Accordion>
    </div>
  );
}