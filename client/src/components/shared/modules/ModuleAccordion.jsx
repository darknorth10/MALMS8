import React from "react";
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


 
  return (
    <div className="max-w-screen-md mx-auto my-4">
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(1)}>Mastery Level 1</AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
            <Button onClick={() => redirect('/module/1/1')} fullWidth>Competency Level 1</Button>
            <Button fullWidth>Competency Level 2</Button>
            <Button fullWidth>Competency Level 3</Button>
            <Button fullWidth>Competency Level 4</Button>
            <Button fullWidth>Competency Level 5</Button>
            <Button fullWidth>Competency Level 6</Button>
            <Button fullWidth>Competency Level 7</Button>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(2)}>
        Mastery Level 2
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
            <Button color="blue" fullWidth>Competency Level 1</Button>
            <Button color="blue" fullWidth>Competency Level 2</Button>
            <Button color="blue" fullWidth>Competency Level 3</Button>
            <Button color="blue" fullWidth>Competency Level 4</Button>
            <Button color="blue" fullWidth>Competency Level 5</Button>
            <Button color="blue" fullWidth>Competency Level 6</Button>
            <Button color="blue" fullWidth>Competency Level 7</Button>
        </AccordionBody>
      </Accordion>
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader onClick={() => handleOpen(3)}>
          Mastery Level 3
        </AccordionHeader>
        <AccordionBody className="flex flex-col gap-6">
            <Button color="teal" fullWidth>Competency Level 1</Button>
            <Button color="teal" fullWidth>Competency Level 2</Button>
            <Button color="teal" fullWidth>Competency Level 3</Button>
            <Button color="teal" fullWidth>Competency Level 4</Button>
            <Button color="teal" fullWidth>Competency Level 5</Button>
            <Button color="teal" fullWidth>Competency Level 6</Button>
            <Button color="teal" fullWidth>Competency Level 7</Button>
        </AccordionBody>
      </Accordion>
    </div>
  );
}