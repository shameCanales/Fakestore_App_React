import React from "react";

export default function NavButton({ children }: { children: React.ReactNode }) {
  return <button className="border-1 border-stone-600 montserrat-regular text-sm text-stone-50 px-3 py-0.5 rounded-md">{children}</button>;
}
