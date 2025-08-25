type HeadingProps = {
  text: string,
};

export default function Heading({ text }: HeadingProps) {
  return <h1 className="poppins-bold text-5xl mt-15">{text}</h1>;
}
