import Alert from "@mui/material/Alert";



export const AlertBox = ({showAlert, alertText, alertStatus, setShowAlert}) => {
  return (
    <div className="max-w-screen-2xl mx-auto py-3">
      <Alert variant="filled" className="mx-auto" severity={alertStatus} onClose={() => { setShowAlert(false) }}>
            {alertText}
      </Alert>
    </div>
  );
}