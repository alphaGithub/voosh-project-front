import { Button, ListItem, Paper, TextField } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useState } from "react";
import { loginRequest } from "../services/login";
const LoginForm = ({ setStatus, setContent, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);

    loginRequest({ email, password })
      .then((data) => {
        console.log("[msg] loggedIn", data || {});
        setEmail("");
        setPassword("");
        setContent("TASK");
        setStatus(true);
        setUser(data || {});
      })
      .catch((e) => {
        console.log("[err] error", e);
      });
    // Reset form after submission (optional)
  };
  return (
    <div style={{ width: "30%", padding: "100px", margin: "auto" }}>
      <ListItem
        style={{ color: "#0000FF" }}
        sx={{ color: "text.primary", fontSize: 30, fontWeight: "medium" }}
      >
        Login
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
            LogIn
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginForm;
