import React, { useEffect } from "react";
import HomePage from "./pages/HomePage";
import MainRoutes from "./routes/MainRoutes";
import { useAuthContext } from "./contexts/AuthContext";

const App = () => {
  const { checkAuth } = useAuthContext();

	useEffect(() => {
		checkAuth();
	}, []);
  return <MainRoutes />
};

export default App;
