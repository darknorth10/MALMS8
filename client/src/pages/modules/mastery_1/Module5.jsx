import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { Materials } from "./Materials";
import module from "../../../assets/pdf/modules/mastery_1/module5.pdf"
import { useState, useEffect } from "react";
import RelatedVideo from "../../../components/shared/modules/RelatedVideo";
import { AssessmentButton } from "../../../components/shared/modules/AssessmentButton";
import { ActsModule5 } from "../../../components/shared/activity/ActsModule5";
import { References } from "../../../components/shared/references/References";
import refImg from "../../../assets/refs/ref_5.png"


  export const Module5 = () => {

    const [moduleSrc, setModuleSrc] = useState(module)
    const [disable, setDisable] = useState(true)
    const current_mastery = parseFloat(localStorage.getItem("mastery"))


    const videoId = "BD2Ibeq08so"
    const videoId2 = "C3Hid-1RtJ4"
    
    const role = localStorage.getItem('role')
    const url = "/formative/6/"
    

    useEffect(() => {

      if(current_mastery == 1.5) {
        setDisable(false)
      }

    }, [])


    const data = [
      {
        label: "Materials",
        value: "materials",
        desc: <Materials moduleSrc={`${moduleSrc}`} title={"Mastery Level 1 Module 5"}/>,
      },
      {
        label: "Videos",
        value: "videos",
        desc: <><p className="font-semibold p-5 text-xl text-center">Hey there amazing learner! To provide you additional information about our lesson that you might use for higher level of learning later on, we have attached the following videos.</p><div className="grid grid-rows-2 gap-8"><RelatedVideo videoId={videoId}/><RelatedVideo videoId={videoId2}/></div></>,
      },
      {
        label: "Activities",
        value: "activities",
        desc: <div className="max-w-screen-2xl bg-white rounded min-h-[50vh] mx-auto drop-shadow p-8">
        <ActsModule5/>
      </div>,
      },
   
      {
        label: "Assessment",
        value: "assessment",
        desc: <AssessmentButton disable={disable} url={url}/>,
      },
      {
        label: "References",
        value: "references",
        desc: <References refImg={refImg}/>,
      },

    ];
   
      return (
          <Tabs id="custom-animation" value="materials">
              {role && role == 'student' ? <><TabsHeader>
                  {data.map(({ label, value }) => (
                      <Tab key={value} value={value}>
                          {label}
                      </Tab>
                  ))}
              </TabsHeader>
                  <TabsBody
                      animate={{
                          initial: { y: 250 },
                          mount: { y: 0 },
                          unmount: { y: 250 },
                      }}
                  >
                      {data.map(({ value, desc }) => (
                          <TabPanel key={value} value={value}>
                              {desc}
                          </TabPanel>
                      ))}
                  </TabsBody></> 
                  
                  // else
                  :
                  <>
                      <TabsHeader>
                       
                              <Tab value={data[0].value}>
                                  {data[0].label}
                              </Tab>
            
                      </TabsHeader>
                      <TabsBody
                          animate={{
                              initial: { y: 250 },
                              mount: { y: 0 },
                              unmount: { y: 250 },
                          }}
                      >
                   
                              <TabPanel value={data[0].value}>
                                  {data[0].desc}
                              </TabPanel>
         
                      </TabsBody>

                  </>
        
        }
      </Tabs>
    );
  }