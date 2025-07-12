export default function LinkText({ name, active }) {
  

  let style = active
    ? "montserrat-bold border-b-stone-50 border-b-2 text-stone-50 uppercase mr-15"
    : "text-stone-50 uppercase mr-15 montserrat-regular";

  return <p className={style}>{name}</p>;
}
