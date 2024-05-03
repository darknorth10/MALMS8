import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function DialogAlert({greet, message, open, redirect, score, items}) {
//   const [open, setOpen] = React.useState(false);
 
//   const handleOpen = () => setOpen(!open);
 
  return (
    <>

      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader ><p className="text-center">{greet}</p></DialogHeader>
        <DialogBody>
          <p className="text-center text-2xl text-blue-700 font-bold">{score} / {items}</p>
          <p className="text-center text-xl py-4 font-bold uppercase text-indigo-500">{message}</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="blue" onClick={() => redirect('/classroom')}>
            <span>Proceed</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}