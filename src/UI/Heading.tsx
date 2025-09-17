interface HeadingProps {
  text: string;
}

export default function Heading({ text }: HeadingProps) {
  return (
    <h1 className="text-xl mt-15 sm:text-2xl font-bold text-gray-900">{text}</h1>
  );
}
