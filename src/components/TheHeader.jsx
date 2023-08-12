import {
  ChevronLeftIcon,
  ChevronRightIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import BaseButton from "../pages/HomePage/components/BaseButton";
import { useNavigate } from "react-router-dom";
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { useAuthContext } from "../contexts/AuthContext";
function TheHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { user, logout } = useAuthContext();
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleClose();
    logout();
  };
  function handleProfile() {
    console.log(user);
    navigate("/profile");
  }

  const navigate = useNavigate();
  return (
    <header className="bg-[#070707] flex-1 flex justify-between items-center py-[10px] px-[13px] sm:px-[32px] sticky top-0 z-10">
      <div className="flex">
        <a
          href="#sidebar"
          className="mr-[8px] text-[#969696] p-1 -ml-1.5 inline-block lg:hidden"
        >
          <Bars3Icon className="h-6 w-6" />
        </a>
        <a href="/" className="mr-[8px] text-[#969696] p-1 cursor-not-allowed">
          <ChevronLeftIcon className="h-6 w-6" />
        </a>
        <a href="/" className="ml-[8px] text-[#969696] p-1 cursor-not-allowed">
          <ChevronRightIcon className="h-6 w-6" />
        </a>
      </div>
        {user && user.is_staff && <BaseButton
          onClick={() => navigate("/add")}
          classes="text-gray-400 hover:text-white"
        >
          Add Your Song
        </BaseButton>}
      <div>
        {!user ? (
          <div>
            <BaseButton
              onClick={() => navigate("/auth")}
              classes="text-gray-400 hover:text-white"
            >
              Sign up
            </BaseButton>
            <BaseButton onClick={() => navigate("/login")} primary>
              Log in
            </BaseButton>
          </div>
        ) : (
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <Avatar
              onClick={handleMenu}
              style={{ width: "40px", height: "40px" }}
            >
              <AccountCircle />
            </Avatar>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleProfile}>Profile</MenuItem>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </IconButton>
        )}
      </div>
    </header>
  );
}

export default TheHeader;
