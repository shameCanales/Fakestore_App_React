import type { ReactNode } from "react";

type FormLabelProps = {
  children: ReactNode;
  htmlFor: string;
};

export default function FormLabel({ children, htmlFor }: FormLabelProps) {
  return (
    <label className="montserrat-medium" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
