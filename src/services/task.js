import httpClient from "./httpClient";

const getTask = async () => {
  try {
    console.log("fetchign...");
    const response = await httpClient().get("/task");
    console.log(response);
    return response?.data?.data;
  } catch (error) {
    throw new Error("[err] error while fetchingTask!!!", error);
  }
};

const createTask = async ({ name, description }) => {
  try {
    const response = await httpClient().post("/task", {
      name,
      description,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error("[err] error while creatingTask!!!", error);
  }
};

const updateTask = async ({ id, name, description, status }) => {
  try {
    const payload = { id };
    if (name) payload.name = name;
    if (description) payload.description = description;
    if (status) payload.status = status;
    const response = await httpClient().put("/task", payload);
    console.log(response);
    return response;
  } catch (error) {
    throw new Error("[err] error while updatingTask!!!", error);
  }
};
const deleteTask = async (id) => {
  try {
    console.log("payload...", { id });
    const response = await httpClient().post("/task/delete", { id });
    return response;
  } catch (error) {
    throw new Error("[err] error while deletingTask!!!", error);
  }
};

export { getTask, createTask, updateTask, deleteTask };
