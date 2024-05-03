import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
import { Materials } from "./Materials";
import module3 from "../../../assets/pdf/modules/supp_3/module17.pdf"
import { useState, useEffect } from "react";
import RelatedVideo from "../../../components/shared/modules/RelatedVideo";
import { AssessmentButton } from "../../../components/shared/modules/AssessmentButton";
import { ActsModule38 } from "../../../components/shared/activity/ActsModule38";
import { References } from "../../../components/shared/references/References";
import refImg from "../../../assets/refs/ref_38.png"


  export const Module38 = () => {

    const [moduleSrc, setModuleSrc] = useState(module3)
    const [disable, setDisable] = useState(true)
    const current_mastery = parseFloat(localStorage.getItem("mastery"))

    const videoId = "wSfZegd_Teg"
    const videoId2 = "bnkTQ5c_G3k"
    
    const role = localStorage.getItem('role')
    const url = "/formative/43/"
    

    useEffect(() => {

      if(current_mastery == 6.3) {
        setDisable(false)
      }

    }, [])

    const data = [
      {
        label: "Materials",
        value: "materials",
        desc: <Materials moduleSrc={`${moduleSrc}`} title={"Mastery Level 3 Supplementary Module 3"}/>,
      },
      {
        label: "Videos",
        value: "videos",
        desc:<><p className="font-semibold p-5 text-xl text-center">Hey there amazing learner! To provide you additional information about our lesson that you might use for higher level of learning later on, we have attached the following videos.</p><div className="grid grid-rows-2 gap-8"><RelatedVideo videoId={videoId}/><RelatedVideo videoId={videoId2}/></div></>,
      },
      {
        label: "Activities",
        value: "activities",
        desc: <div className="max-w-screen-2xl bg-white rounded min-h-[50vh] mx-auto drop-shadow p-8">
        <ActsModule38/>
      </div>
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