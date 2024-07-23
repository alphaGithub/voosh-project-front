import { getTask, updateTask } from "../services/task";
import { Paper } from "@mui/material";
import TaskRow from "./TaskRow";

import { useDrop } from "react-dnd";
const TaskColumn = ({ type, task, setTask }) => {
  const [, drop] = useDrop(
    () => ({
      accept: "CARD",
      drop: function (item) {
        console.log(task, item.id, type);

        handleDrop(task, item.id, type);
        return { type: type };
      },

      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    }),
    [task]
  );
  const handleDrop = (task, id, type) => {
    const t = task?.filter((item) => item.id === id);
    console.log(task, t);
    if (!t?.length) return;
    const draggedTask = t[0];
    console.log(draggedTask);
    if (type === draggedTask.status) return;
    updateTask({ id, status: type })
      .then((data) => {
        getTask()
          .then((data) => {
            setTask(data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Paper
      elevation={3}
      style={{
        width: "25%",
        height: "100%",
        float: "left",
        padding: "10px",
        margin: "20px",
        overflow: "auto",
      }}
      ref={drop}
    >
      <div>
        <h3
          style={{
            backgroundColor: "#0000FF",
            padding: "10px",
            color: "white",
          }}
        >
          {type === "pending"
            ? "TODO"
            : type === "completed"
            ? "COMPLETED"
            : "IN PROGRESS"}
        </h3>
        {task
          ?.filter((item) => item.status === type)
          ?.map((item) => {
            return <TaskRow data={item} key={item.id} setTask={setTask} />;
          })}
      </div>
    </Paper>
  );
};

export default TaskColumn;
