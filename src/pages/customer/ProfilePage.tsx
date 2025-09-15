import type { RootState } from "../../store/store.js";
import { useSelector } from "react-redux";
import { useMutation } from "@tanstack/react-query";

export default function ProfilePage() {
  // const {data, error, isError, isPending} = useMutation({
  //   mutationFn: 
  // })

  const {
    name,
    avatar: profilePicture,
    role,
    id,
  } = useSelector((state: RootState) => state.auth.profileData);

  function handleEditInfo() {
    console.log("edit mo na yan");
  }

  return (
    <div className="text-center pt-35">
      <h1 className="montserrat-bold text-3xl">My Profile</h1>
      <img className="rounded-full w-[200px] mx-auto mt-5" src={profilePicture} />
      <p className="mt-5 montserrat-medium">ID: 00000{id}</p>
      <p>
        {name} | {role}
      </p>
      <button className="bg-stone-900 text-stone-200 py-2 px-6 rounded-sm mt-5" onClick={() => handleEditInfo()}>Edit Info</button>
    </div>
  );
}
