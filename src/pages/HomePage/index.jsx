import { useRef } from "react";
import useEvent from "./hooks/useEvent";
import BasePopover from "./components/BasePopover";
import BaseToast from "./components/BaseToast";
import TheMain from "./components/TheMain";
import TheRegistration from "./components/TheRegistration";

function HomePage() {
  const contentWrapperRef = useRef();
  const toastRef = useRef();
  const popoverRef = useRef();

  let isScrollingEnabled = true;

  useEvent("wheel", handleScrolling, true, () => contentWrapperRef.current);

  function showToast(message) {
    toastRef.current.show(message);
  }

  function toggleScrolling(isEnabled) {
    isScrollingEnabled = isEnabled;
  }

  function handleScrolling(event) {
    if (isScrollingEnabled) return;

    event.preventDefault();
    event.stopPropagation();
  }

  return (
    <>
      <div className="flex grow overflow-auto">
        <div className="flex-1 overflow-auto" ref={contentWrapperRef}>
          <TheMain showToast={showToast} toggleScrolling={toggleScrolling} />
        </div>
      </div>
      <TheRegistration />
      <BaseToast ref={toastRef} />
      <BasePopover ref={popoverRef} />
    </>
  );
}

export default HomePage;
