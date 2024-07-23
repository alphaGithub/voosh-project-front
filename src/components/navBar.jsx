import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";

import LoginForm from "./LoginForm";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

const LogOutButton = ({ setStatus, setContent }) => {
  const handleClick = (e) => {
    setStatus(false);
    setContent("LOGOUT");
  };
  return (
    <Button variant="contained" color="error" onClick={handleClick}>
      Logout
    </Button>
  );
};
const LogInButton = ({ setStatus, setContent }) => {
  const handleClick = (e) => {
    setContent("LOGIN");
  };
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "white", color: "black", margin: "10px" }}
      onClick={handleClick}
    >
      LogIn
    </Button>
  );
};
const SignUpButton = ({ setStatus, setContent }) => {
  const handleClick = (e) => {
    setContent("SIGNUP");
  };
  return (
    <Button
      variant="contained"
      style={{ backgroundColor: "white", color: "black", margin: "10px" }}
      onClick={handleClick}
    >
      SignUp
    </Button>
  );
};

const NavBar = ({ user = {}, loggedIn, setStatus, setContent }) => {
  const [show, setShowLoginForm] = useState(true);

  return (
    <AppBar component="nav">
      <Toolbar>
        <Typography variant="h6" component="div" style={{ padding: "10px" }}>
          <FontAwesomeIcon icon={faClipboard} />
        </Typography>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          <p>
            <b>{user?.firstName}</b>
          </p>
        </Typography>
        <Box sx={{ display: { xs: "none", sm: "block" } }}>
          {!loggedIn ? (
            <div>
              <LogInButton setContent={setContent} setStatus={setStatus} />
              <SignUpButton setContent={setContent} setStatus={setStatus} />
            </div>
          ) : (
            <LogOutButton setContent={setContent} setStatus={setStatus} />
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
