import React, { useEffect } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import { MyClass } from "./MyClass";
import { ModuleAccordion } from "../../../components/shared/modules/ModuleAccordion";
import { StudentList } from "../../../components/shared/class/StudentList";
import { Feedbacks } from "../../../components/shared/class/Feedbacks";

 
export const ClassRoom = () => {


  const [activeTab, setActiveTab] = React.useState("modules");
  
  const data = [
    {
      label: "Modules",
      value: "modules",
      desc: <ModuleAccordion />,
    },

    {
      label: "Feedbacks",
      value: "feedbacks",
      desc: <Feedbacks/>,
    },
    {
      label: "Students",
      value: "students",
      desc: <StudentList/>,
    },

  ];
  return (
    
    <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
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
  );
}