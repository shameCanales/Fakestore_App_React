type NavLinkTextProps = {
  name: string;
  active?: boolean;
};

export default function NavLinkText({ name, active }: NavLinkTextProps) {
  const style = active
    ? "montserrat-bold border-b-stone-50 border-b-2 text-stone-900 uppercase"
    : " uppercase text-stone-600 montserrat-regular";

  return <p className={style}>{name}</p>;
}
