import React, { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [isRegistering, setIsRegistering] = useState(false);

  if (token) {
    return <Dashboard token={token} />;
  }

  return (
    <>
      {isRegistering ? (
        <Register switchToLogin={() => setIsRegistering(false)} />
      ) : (
        <Login
          setToken={setToken}
          switchToRegister={() => setIsRegistering(true)}
        />
      )}
    </>
  );
}

export default App;