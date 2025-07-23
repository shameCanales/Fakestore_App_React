export default function FormLabel({ children, htmlFor }) {
  return (
    <label className="montserrat-medium" htmlFor={htmlFor}>
      {children}
    </label>
  );
}
