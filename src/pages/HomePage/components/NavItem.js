import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../../../contexts/AuthContext";
import PlaylistList from "./PlaylistList";

function NavItem({ classes, icon, onClick, link, children: label }) {
  const labelRef = useRef();
  const navigate = useNavigate();
  const {user} = useAuthContext()
  function handleClick(event) {
    event.preventDefault();
    if(!user && link !== "/" && link !== "/search") {
      navigate('./auth')
      return
    }
    navigate(link);
    onClick(labelRef.current);

  }
  return (
    <div>
    <a href="/" className={classes} onClick={handleClick}>
      {icon}
      <span ref={labelRef} className="ml-4 text-sm font-semibold">
        {label}
      </span>
    </a>
    {link === 'create' && user ? (<PlaylistList/>) : (null)}
    </div>
  );
}

export default NavItem;
