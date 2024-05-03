import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
 
export function DialogGreet({greet, message, open, handleOpen}) {
 
  return (
    <>

      <Dialog
        open={open}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className=" text-blue-700">{greet}</DialogHeader>
        <DialogBody>
          <p className="text-center text-lg leading-8">{message}</p>
        </DialogBody>
        <DialogFooter>
          <Button variant="gradient" color="blue" onClick={() => handleOpen()}>
            <span>Let&apos;s Go!</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}