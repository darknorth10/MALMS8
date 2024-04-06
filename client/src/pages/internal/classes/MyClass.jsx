import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from 'axios'
import { ModuleAccordion } from "../../../components/shared/modules/ModuleAccordion";
import { StudentList } from "../../../components/shared/class/StudentList";
 
export const MyClass = () => {
  const token = localStorage.getItem('token')
  const class_id = localStorage.getItem('class_id')
  const [code, setCode] = useState("")

  useEffect(() => {
    axios.get(`http://localhost:8000/api/classes/${class_id}/`, {
      headers: {
        Authorization: `Token ${token}`
      }
    })
    .then((response) => {
      setCode(response.data.code)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [])


  const [activeTab, setActiveTab] = React.useState("modules");
  const data = [
    {
      label: "Modules",
      value: "modules",
      desc: <ModuleAccordion />,
    },
    {
      label: "Activities",
      value: "activities",
      desc: `Acts`,
    },
    {
      label: "Students",
      value: "students",
      desc: <StudentList/>,
    },

  ];
  return (
    <>
    <p className="text-center my-5 text-blue-800 font-bold rounded drop-shadow bg-white p-5">Join Code: {code}</p>
    <Tabs className="bg-white drop-shadow-md rounded-md" value={activeTab}>
      <TabsHeader
        className="rounded-none border-blue-gray-50 bg-transparent p-5"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-blue-700 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </>
  );
}