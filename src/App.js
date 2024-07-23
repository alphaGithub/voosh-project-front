import { useEffect, useState } from "react";
import NavBar from "./components/navBar";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/signUpForm";
import LogoutPage from "./components/Logout";
import Task from "./components/Task";
import { getUserRequest } from "./services/login";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
function App() {
  const [loggedIn, setLoggedInStatus] = useState(false);
  const [showContent, setShowContent] = useState("LOGIN");
  const [user, setUser] = useState({});
  useEffect(() => {
    if (!loggedIn) {
      setUser({});
      setShowContent("LOGIN");
    }
  }, [loggedIn]);
  useEffect(() => {
    getUserRequest()
      .then((data) => {
        console.log(data);
        if (data?.id) {
          setUser(data);
          setShowContent("TASK");
          setLoggedInStatus(true);
        }
      })
      .catch((error) => {
        console.log("[err] error!", error);
      });
  }, []);
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <NavBar
          user={user}
          loggedIn={loggedIn}
          setStatus={setLoggedInStatus}
          setContent={setShowContent}
        />
        {showContent === "LOGIN" ? (
          <LoginForm
            setStatus={setLoggedInStatus}
            setContent={setShowContent}
            setUser={setUser}
          />
        ) : (
          <></>
        )}
        {showContent === "SIGNUP" ? (
          <SignUpForm
            setStatus={setLoggedInStatus}
            setContent={setShowContent}
            setUser={setUser}
          />
        ) : (
          <></>
        )}
        {showContent === "TASK" ? <Task /> : <></>}
        {showContent === "LOGOUT" ? <LogoutPage /> : <></>}
      </div>
    </DndProvider>
  );
}

export default App;
