import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography
  } from "@material-tailwind/react";
import { Materials } from "./Materials";
import module8 from "../../../assets/pdf/modules/mastery_2/module8.pdf"
import { useState, useEffect } from "react";
import RelatedVideo from "../../../components/shared/modules/RelatedVideo";
import { AssessmentButton } from "../../../components/shared/modules/AssessmentButton";
import { ActsModule8 } from "../../../components/shared/activity/ActsModule8";
import { References } from "../../../components/shared/references/References";
import refImg from "../../../assets/refs/ref_8.png"


  export const Module8 = () => {
    const [disable, setDisable] = useState(true)
    const current_mastery = parseFloat(localStorage.getItem("mastery"))

    const [moduleSrc, setModuleSrc] = useState(module8)
    const videoId = "FQVZopHWknA"
    const videoId2 = "8ug4Ld0asTI"
    const videoId3 = "IIiwXJy8y0A"
    
    const role = localStorage.getItem('role')
    const url = "/formative/9/"

    useEffect(() => {

      if(current_mastery == 2.1) {
        setDisable(false)
      }

    }, [])
    
    const data = [
      {
        label: "Materials",
        value: "materials",
        desc: <Materials moduleSrc={`${moduleSrc}`} title={"Mastery Level 2 Module 1"}/>,
      },
      {
        label: "Videos",
        value: "videos",
        desc: <>
          <p className="font-semibold p-5 text-xl text-center">Hey there amazing learner! To provide you additional information about our lesson that you might use for higher level of learning later on, we have attached the following videos.</p>
          <div className="grid grid-cols-1 gap-8">
          <RelatedVideo videoId={videoId} />
          <RelatedVideo videoId={videoId2} />
          <RelatedVideo videoId={videoId3} />
          </div>
          
        </>,
      },
      {
        label: "Activities",
        value: "activities",
        desc: <div className="max-w-screen-2xl bg-white rounded min-h-[50vh] mx-auto drop-shadow p-8">
        <ActsModule8/>
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