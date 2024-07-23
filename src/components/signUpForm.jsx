import { Button, ListItem, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { signUpRequest } from "../services/login";
const SignUpForm = ({ setStatus, setContent, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [msg, setMessage] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();

    signUpRequest({ firstName, lastName, email, password })
      .then((data) => {
        console.log("[msg] loggedIn");
        setEmail("");
        setPassword("");
        setFirstName("");
        setLastName("");
        setUser(data);
        setContent("TASK");
        setStatus(true);
      })
      .catch((e) => {
        console.log("[err] error", e);
        setMessage("Error while signUp!");
        setTimeout(() => {
          setMessage("");
        }, 3000);
      });
  };
  return (
    <div style={{ width: "30%", padding: "100px", margin: "auto" }}>
      <ListItem
        style={{ color: "#0000FF" }}
        sx={{ color: "text.primary", fontSize: 30, fontWeight: "medium" }}
      >
        SignUp
      </ListItem>
      <Paper
        elevation={3}
        sx={{ boxShadow: 3, borderColor: blue, border: "5px" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ margin: "5px", padding: "10px" }}
        >
          <TextField
            label="First Name"
            type="text"
            variant="outlined"
            value={firstName}
            onInput={(e) => {
              setFirstName(e.target.value);
            }}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Last Name"
            type="text"
            variant="outlined"
            value={lastName}
            onInput={(e) => {
              setLastName(e.target.value);
            }}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            value={email}
            onInput={(e) => {
              setEmail(e.target.value);
            }}
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="password"
            type="password"
            variant="outlined"
            value={password}
            onInput={(e) => {
              setPassword(e.target.value);
            }}
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            SignUp
          </Button>
          <p style={{ padding: "10px", margin: "10px", color: "red" }}>{msg}</p>
        </form>
      </Paper>
    </div>
  );
};
export default SignUpForm;
