import React, { useState } from "react";

interface Props {
  children: (handleClick: () => void, open: boolean) => React.ReactNode;
  activecondition: boolean;
}

function SidebarLinkGroup({ children, activecondition }: Props) {
  const [open, setOpen] = useState<boolean>(activecondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
        activecondition ? "bg-slate-900" : ""
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
}

export default SidebarLinkGroup;
