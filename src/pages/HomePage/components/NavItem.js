import { useRef } from "react";
import { useNavigate } from "react-router";

function NavItem({ classes, icon, onClick, link, children: label }) {
  const labelRef = useRef();
  const navigate = useNavigate();
  function handleClick(event) {

    event.preventDefault();

    navigate(link);
    onClick(labelRef.current);

  }

  return (
    <a href="/" className={classes} onClick={handleClick}>
      {icon}
      <span ref={labelRef} className="ml-4 text-sm font-semibold">
        {label}
      </span>
    </a>
  );
}

export default NavItem;
