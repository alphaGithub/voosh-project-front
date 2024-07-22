import httpClient from "./httpClient";

const loginRequest = async ({ email, password }) => {
  try {
    const response = await httpClient().post("/login", { email, password });
    return response?.data?.data;
  } catch (error) {
    throw new Error("[err] error while loginRequest!!!", error);
  }
};

const getUserRequest = async () => {
  try {
    const response = await httpClient().get("/user");
    return response?.data?.data;
  } catch (error) {
    throw new Error("[err] error while getUserRequest!!!", error);
  }
};

const signUpRequest = async ({ firstName, lastName, email, password }) => {
  try {
    const response = await httpClient().post("/signUp", {
      firstName,
      lastName,
      email,
      password,
    });
    console.log(response);
    return response;
  } catch (error) {
    throw new Error("[err] error while loginRequest!!!", error);
  }
};

export { loginRequest, signUpRequest, getUserRequest };
