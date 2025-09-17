import type { RootState } from "../../store/store.js";
import type { AppDispatch } from "../../store/store.js";
import { useSelector, useDispatch } from "react-redux";
import EditProfileModal from "../../components/EditProfileModal.js";
import { uiActions } from "../../store/ui-Slice.js";
import { useGetProfileInfo } from "../../hooks/useGetProfileInfo.js";
import { authActions } from "../../store/auth-slice.js";
import { useNavigate } from "react-router";

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const { data: profileData, isPending: gettingProfilePending } =
    useGetProfileInfo(token, !!token);

  const { isEditing } = useSelector(
    (state: RootState) => state.ui.editProfileModal
  );

  const handleEditProfileInfo = () => {
    dispatch(uiActions.OpenEditProfileModal());
  };

  const handleLogout = (): void => {
    dispatch(authActions.logout());
    navigate("/");
  };

  return (
    <div className="text-center pt-35 relative">
      <h1 className="montserrat-bold text-3xl">My Profile</h1>
      <img
        className="rounded-full w-[200px] mx-auto mt-5"
        src={profileData?.avatar}
      />
      <p className="mt-5 montserrat-medium">ID: 00000{profileData?.id}</p>
      <p>
        {profileData?.name} | {profileData?.role}
      </p>
      <button
        className="bg-stone-900 text-stone-200 py-2 px-6 rounded-sm mt-5"
        onClick={() => handleEditProfileInfo()}
      >
        Edit Info
      </button>

      <button
        className="hidden md:block bg-red-600 hover:bg-red-500 transition-colors text-white py-2 px-4 rounded-xl font-medium"
        onClick={handleLogout}
      >
        Logout
      </button>

      {isEditing && <EditProfileModal />}
    </div>
  );
}
