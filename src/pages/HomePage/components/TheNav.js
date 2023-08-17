import { MIN_DESKTOP_WIDTH } from "../utils";
import {
  HomeIcon,
  MagnifyingGlassIcon,
  ViewColumnsIcon,
  PlusCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import NavItem from "./NavItem";

const activeNavItemClasses =
  "flex items-center text-white bg-[#282828] mx-2 px-4 py-2 rounded";
const navItemClasses =
  "flex items-center hover:text-white mx-2 px-4 py-2 rounded duration-300";

function TheNav({ showPopover }) {
  const navItems = [
    {
      label: "Home",
      classes: activeNavItemClasses,
      icon: <HomeIcon className="h-6 w-6" />,
      link: "/",
    },
    {
      label: "Search",
      classes: navItemClasses,
      icon: <MagnifyingGlassIcon className="h-6 w-6" />,
      link: "/search",
    },
    {
      label: "Your Library",
      classes: `${navItemClasses} mb-6`,
      icon: <ViewColumnsIcon className="h-6 w-6" />,
      link: "/library",
      action: (target) => {
        showPopover(
          "Enjoy Your Library",
          "Log in to see saved songs, podcasts, artists, and playlists in Your Library.",
          target
        );
      },
    },
  ];

  return (
    <nav>
      {navItems.map(({ classes, icon, label, link, action }) => (
        <NavItem
          key={label}
          classes={classes}
          icon={icon}
          onClick={action}
          link={link}
        >
          {label}
        </NavItem>
      ))}
    </nav>
  );
}

export default TheNav;
