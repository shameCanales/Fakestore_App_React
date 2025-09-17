import React from "react";
import { NavLink } from "react-router";

interface NavButtonProps {
  route: string;
  icon: string;
  label: string;
}

export default function NavButton({ route, icon, label }: NavButtonProps) {
  return (
    <NavLink className="flex items-center gap-1 p-1 border-1 border-slate-500 rounded-lg" to={route}>
      <img className="w-3" src={icon} alt={label} />
      <p className="text-sm poppins-medium">{label}</p>
    </NavLink>
  );
}
