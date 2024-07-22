import React, { useState } from "react";
import {
  Modal,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import { getTask, updateTask } from "../services/task";

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
const TaskEdit = ({ open, handleClose, data, setTask }) => {
  const [name, setName] = useState(data.name || "");
  const [description, setDiscription] = useState(data.description || "");
  const [status, setStatus] = useState(data.status || "pending");
  const [message, setMessage] = useState("");
  const handleEditSave = () => {
    updateTask({ id: data.id, name, description, status })
      .then(() => {
        setMessage("update success!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
        getTask()
          .then((data) => {
            console.log("setting", data);
            console.log(data);
            setTask(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        setMessage("update Failed!");
        setTimeout(() => {
          setMessage("");
        }, 5000);
      });
  };
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
            <TextField
              label="Title"
              type="text"
              variant="outlined"
              value={name}
              onInput={(e) => {
                setName(e.target.value);
              }}
              margin="normal"
              fullWidth
              required
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <TextField
              label="Description"
              type="text"
              variant="outlined"
              value={description}
              onInput={(e) => {
                setDiscription(e.target.value);
              }}
              margin="normal"
              fullWidth
              required
            />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Select
              color="primary"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={status}
              label="sort by:"
              onChange={(e) => {
                setStatus(e.target.value);
              }}
              style={{ float: "right", margin: "10px", color: "black" }}
              size="small"
            >
              <MenuItem value={"pending"}>PENDING</MenuItem>
              <MenuItem value={"inProgress"}>IN PROGRESS</MenuItem>
              <MenuItem value={"completed"}>COMPLETED</MenuItem>
            </Select>
          </Typography>
          {message?.length ? (
            <Button
              color="primary"
              style={{ position: "absolute", bottom: "30px", left: "30%" }}
            >
              {message}
            </Button>
          ) : (
            <></>
          )}
          <Button
            variant="contained"
            color="success"
            style={{ position: "absolute", bottom: "80px", left: "40%" }}
            onClick={handleEditSave}
          >
            Save
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default TaskEdit;
