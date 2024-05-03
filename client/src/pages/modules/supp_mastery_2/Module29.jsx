import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Typography,
    
  } from "@material-tailwind/react";
import { Materials } from "./Materials";
import module1 from "../../../assets/pdf/modules/supp_2/module8.pdf"
import { useState, useEffect } from "react";
import RelatedVideo from "../../../components/shared/modules/RelatedVideo";
import { AssessmentButton } from "../../../components/shared/modules/AssessmentButton";
import { ActsModule29 } from "../../../components/shared/activity/ActsModule29";
import { References } from "../../../components/shared/references/References";
import refImg from "../../../assets/refs/ref_29.png"


  export const Module29 = () => {

    const [disable, setDisable] = useState(true)

    const current_mastery = parseFloat(localStorage.getItem("mastery"))

    const [moduleSrc, setModuleSrc] = useState(module1)

    const videoId = "A1mQ9kD-i9I"
    
    const videoId2 = "FQVZopHWknA"
    
    const role = localStorage.getItem('role')

    const url = "/formative/33/"

    useEffect(() => {

      if(current_mastery == 5.1) {
        setDisable(false)
      }

    }, [])

    const data = [
      {
        label: "Materials",
        value: "materials",
        desc: <Materials moduleSrc={`${moduleSrc}`} title={"Mastery Level 2 Supplementary Module 1"}/>,
      },
      {
        label: "Videos",
        value: "videos",
        desc: <>
          <p className="font-semibold p-5 text-xl text-center">To further understand the concepts of mean, median and mode, please watch the
            linked video:</p>
            <div className="grid grid-cols-1 gap-8">
              <RelatedVideo videoId={videoId} />
              <RelatedVideo videoId={videoId2} />
            </div>
          
        </>,
      },
      {
        label: "Activities",
        value: "activities",
        desc:
        <div className="max-w-screen-2xl bg-white rounded min-h-[50vh] mx-auto drop-shadow p-8">
          <ActsModule29/>
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