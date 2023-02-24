import React from "react";
import { Auth, useAuth } from "@context/auth";

const Home = () => {
  const { logout } = useAuth() as unknown as Auth;

  return (
    <div>
      Home
      <button onClick={logout}>logout</button>
    </div>
  );
};

export default Home;
