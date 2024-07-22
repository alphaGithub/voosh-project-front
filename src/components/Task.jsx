import { useEffect, useState } from "react";
import { getTask } from "../services/task";
import {
  Button,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import TaskRow from "./TaskRow";
import TaskAdd from "./TaskAdd";

const Task = () => {
  const [task, setTask] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("recent");
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAddTask = () => setOpenAdd(true);
  const handleCloseAddTask = () => setOpenAdd(false);
  const handleSearch = () => {};
  useEffect(() => {
    console.log("tasks");
    getTask()
      .then((data) => {
        console.log("setting", data);
        console.log(data);
        setTask(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div
      style={{
        width: "85%",
        top: "0px",
        bottom: "100px",
        position: "absolute",
        padding: "100px",
        margin: "auto",
      }}
    >
      <Button
        variant="contained"
        color="primary"
        style={{ margin: "10px" }}
        size="small"
        onClick={handleOpenAddTask}
      >
        Add Task
      </Button>
      <Paper elevation={1}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            endAdornment: (
              <IconButton onClick={handleSearch}>
                <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
              </IconButton>
            ),
          }}
          size="small"
          style={{ padding: "10px" }}
        />
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="sort by:"
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          style={{ float: "right", margin: "10px", color: "black" }}
          size="small"
        >
          <MenuItem value={"recent"}>recent</MenuItem>
          <MenuItem value={"old"}>old</MenuItem>
        </Select>
      </Paper>
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
      >
        <h3
          style={{
            backgroundColor: "#0000FF",
            padding: "10px",
            color: "white",
          }}
        >
          TODO
        </h3>
        {task
          ?.filter((item) => item.status === "pending")
          ?.map((item) => {
            return <TaskRow data={item} key={item.id} setTask={setTask} />;
          })}
      </Paper>
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
      >
        <h3
          style={{
            backgroundColor: "#0000FF",
            padding: "10px",
            color: "white",
          }}
        >
          IN PROGRESS
        </h3>
        {task
          ?.filter((item) => item.status === "inProgress")
          ?.map((item) => {
            return <TaskRow data={item} key={item.id} setTask={setTask} />;
          })}
      </Paper>
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
      >
        <h3
          style={{
            backgroundColor: "#0000FF",
            padding: "10px",
            color: "white",
          }}
        >
          COMPLETED
        </h3>
        {task
          ?.filter((item) => item.status === "completed")
          ?.map((item) => {
            return <TaskRow data={item} key={item.id} setTask={setTask} />;
          })}
      </Paper>
      <TaskAdd
        open={openAdd}
        handleClose={handleCloseAddTask}
        setTask={setTask}
      />
    </div>
  );
};

export default Task;
