type NavLinkTextProps = {
  name: string;
  active?: boolean;
};

export default function NavLinkText({ name, active }: NavLinkTextProps) {
  const style = active
    ? "montserrat-bold border-b-stone-50 border-b-2 text-stone-50 uppercase"
    : "text-stone-50 uppercase montserrat-regular";

  return <p className={style}>{name}</p>;
}
