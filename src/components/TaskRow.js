import { useState } from "react";
import { deleteTask, getTask } from "../services/task";
import { Button, Card, CardContent, CardHeader } from "@mui/material";
import TaskView from "./TaskView";
import TaskEdit from "./TaskEdit";
import { useDrag } from "react-dnd";

const TaskRow = ({ data, setTask, onCardDrag }) => {
  const [taskData, setTaskData] = useState(data);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = () => setOpenEdit(true);
  const handleCloseEdit = () => setOpenEdit(false);
  const [, drag] = useDrag(() => ({
    type: "CARD",
    item: { id: data.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  const handleDelete = () => {
    deleteTask(data.id)
      .then(() => {
        getTask()
          .then((data) => {
            setTask(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {});
  };
  return (
    <div style={{ marginTop: "10px" }} ref={drag}>
      <Card>
        <CardHeader title={taskData?.name}></CardHeader>
        <CardContent>
          {taskData?.description}
          <div>
            <Button
              variant="contained"
              color="error"
              size="small"
              style={{ margin: "5px", float: "right" }}
              onClick={handleDelete}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ margin: "5px", float: "right" }}
              onClick={handleOpenEdit}
            >
              Edit
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ margin: "5px", float: "right" }}
              onClick={handleOpen}
            >
              View
            </Button>
          </div>
        </CardContent>
        <TaskView open={open} handleClose={handleClose} data={taskData} />
        <TaskEdit
          open={openEdit}
          handleClose={handleCloseEdit}
          data={taskData}
          setTask={setTask}
        />
      </Card>
    </div>
  );
};

export default TaskRow;
