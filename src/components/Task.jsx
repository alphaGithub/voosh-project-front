import { useEffect, useState } from "react";
import { getTask, updateTask } from "../services/task";
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
import TaskAdd from "./TaskAdd";

import TaskColumn from "./TaskColumn";

const Task = () => {
  const [task, setTask] = useState([]);
  const [searchtask, setSearchTask] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("old");
  const [openAdd, setOpenAdd] = useState(false);
  const handleOpenAddTask = () => setOpenAdd(true);
  const handleCloseAddTask = () => setOpenAdd(false);
  const handleSearch = () => {};

  useEffect(() => {
    getTask()
      .then((data) => {
        setSearchTask(data);
        setTask(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    if (!search?.length) {
      setSearchTask(task);
      return;
    }
  }, [task]);
  useEffect(() => {
    if (!search?.length) {
      setSearchTask(task);
    }
    const filteredItem = task?.filter(
      (item) =>
        item.name &&
        item.name.toLowerCase().search(search?.toLowerCase()) !== -1
    );
    const sortedItem = filteredItem.sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      if (filter === "recent") {
        return dateB - dateA;
      }
      return dateA - dateB;
    });
    setSearchTask(sortedItem);
  }, [search, filter]);

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
      <TaskColumn task={searchtask} setTask={setTask} type={"pending"} />
      <TaskColumn task={searchtask} setTask={setTask} type={"inProgress"} />
      <TaskColumn task={searchtask} setTask={setTask} type={"completed"} />
      <TaskAdd
        open={openAdd}
        handleClose={handleCloseAddTask}
        setTask={setTask}
      />
    </div>
  );
};

export default Task;
