import React, { useRef } from "react";
import { Outlet } from "react-router-dom";
import TheSidebar from "../components/TheSidebar";
import TheSidebarOverlay from "../components/TheSidebarOverlay";
import useEvent from "../pages/HomePage/hooks/useEvent";
import TheHeader from "../components/TheHeader";
import { useTracksContext } from "../contexts/TracksContext";

const MainLayouts = () => {
  const popoverRef = useRef();
  const contentWrapperRef = useRef();
  const toastRef = useRef();
  let isScrollingEnabled = true;
  function handleScrolling(event) {
    if (isScrollingEnabled) return;

    event.preventDefault();
    event.stopPropagation();
  }
  useEvent("wheel", handleScrolling, true, () => contentWrapperRef.current);

  function showPopover(title, description, target, offset) {
    popoverRef.current.show(title, description, target, offset);
  }
  function showToast(message) {
    toastRef.current.show(message);
  }
  function toggleScrolling(isEnabled) {
    isScrollingEnabled = isEnabled;
  }

  return (
    <div className="flex grow overflow-auto">
      <TheSidebar showPopover={showPopover} />
      <TheSidebarOverlay />
      <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
        <TheHeader />
        <Outlet showToast={showToast} toggleScrolling={toggleScrolling} />
      </div>
    </div>
  );
};

export default MainLayouts;
