import { useEffect } from "react";

export const useDropdownAutoClose = () => {
  useEffect(() => {
    const handleClick = (event) => {
      const allDetails = document.querySelectorAll("details");

      allDetails.forEach((detail) => {
        if (!detail.contains(event.target)) {
          detail.removeAttribute("open");
        } else {
          // If clicking on a summary inside another details, close others
          allDetails.forEach((d) => {
            if (d !== detail) d.removeAttribute("open");
          });
        }
      });

      // Close on submenu click (e.g., <NavLink>)
      if (event.target.tagName === "A") {
        allDetails.forEach((d) => d.removeAttribute("open"));
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, []);
};
