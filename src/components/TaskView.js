import React from "react";
import { Modal, Typography, Box, Button } from "@mui/material";
import moment from "moment/moment";

const style = {
  position: "absolute",
  top: "100px",
  left: "30%",
  bottom: "100px",
  // transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};
const TaskView = ({ open, handleClose, data }) => {
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task Details
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Title: </b>
            {data.name}
            <Button variant="contained" style={{ float: "right" }}>
              {data.status}
            </Button>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Description: </b>
            {data.description}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <b>Created Time :</b>
            {moment
              .utc(data.createdAt)
              .add(330, "minute")
              .format("YYYY-MM-DD HH:mm:ss")}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskView;
