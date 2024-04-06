import React from 'react'
import { Button } from '@material-tailwind/react'
import { PdfDialog } from '../../../components/shared/class/PdfDialog';
import { saveAs } from "file-saver";

export const Materials = ({moduleSrc, title}) => {

    // download pdf
    const saveFile = () => {
        saveAs(moduleSrc, `${title}.pdf`);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
  return (
    <>
    <h5 className='font-bold uppercase p-5 text-xl text-center'>{title}</h5>
    <div className='bg-white rounded-lg drop-shadow-lg min-h-[50vh] flex flex-col items-center justify-center'>
        

        <div className='flex flex-col gap-7 w-2/3 mx-auto'>
            <Button variant='gradient' color='blue' onClick={handleClickOpen} >View Lesson PDF</Button>
            <Button variant='gradient' color='green' onClick={saveFile} >Download Lesson PDF</Button>
        </div>
    </div>


    <PdfDialog open={open} setOpen={setOpen} handleClickOpen={handleClickOpen} handleClose={handleClose} title={title} moduleSrc={moduleSrc}/>
    </>

    
  )
}
