/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Alert from "@mui/material/Alert";



export const AlertBox = ({showAlert, alertText, alertStatus, setShowAlert}) => {
  return (
    <div className="max-w-screen-2xl mx-auto py-3">
      <Alert variant="filled" className="mx-auto animate-fade-down"  severity={alertStatus} onClose={() => { setShowAlert(false) }}>
            {alertText}
      </Alert>
    </div>
  );
}