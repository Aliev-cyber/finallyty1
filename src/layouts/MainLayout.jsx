import React from "react";
import { Outlet } from "react-router-dom";

const MainLayouts = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default MainLayouts;