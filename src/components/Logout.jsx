import { useEffect } from "react";

const LogoutPage = () => {
  useEffect(() => {
    document.cookie = "user=";
  });
  return (
    <div style={{ width: "30%", padding: "100px", margin: "auto" }}>
      <h3 style={{ color: "#0000FF" }}>Thank You!</h3>
    </div>
  );
};
export default LogoutPage;
