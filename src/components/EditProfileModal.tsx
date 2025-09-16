import type { AppDispatch, RootState } from "../store/store.js";
import type { SubmitHandler } from "react-hook-form";
import type { ProfileData } from "../types/ProfileData.js";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../store/ui-Slice.js";
import { useForm } from "react-hook-form";
import { useGetProfileInfo } from "../hooks/useGetProfileInfo.js";
import { updateUser } from "../util/updateUser.js";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";

export default function EditProfileModal() {
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((state: RootState) => state.auth.token);

  const { data: profileData, isPending: gettingProfilePending } =
    useGetProfileInfo(token, !!token);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Partial<ProfileData>>({
    defaultValues: {
      email: profileData?.email || "",
      password: "",
      name: profileData?.name || "",
      role: profileData?.role || "customer",
      avatar: profileData?.avatar || "",
    },
  });

  useEffect(() => {
    if (profileData) {
      reset({
        email: profileData.email,
        password: "",
        name: profileData.name,
        role: profileData.role,
        avatar: profileData.avatar,
      });
    }
  }, [profileData, reset]);

  const { mutate, isError, isPending, isSuccess } = useMutation({
    mutationFn: (data: Partial<ProfileData>) =>
      updateUser({ id: profileData!.id, data }),
  });

  const onSubmit: SubmitHandler<Partial<ProfileData>> = (data) => {
    if (!data.password) delete data.password;
    mutate(data);
  };

  const handleCloseEditProfileInfo = () => {
    dispatch(uiActions.closeEditProfileModal());
  };

  if (gettingProfilePending) return <p>Loading profile...</p>;

  return (
    <div className="p-6 bg-white rounded shadow-md w-full max-w-md mx-auto">
      <button
        onClick={handleCloseEditProfileInfo}
        className="mb-4 text-gray-500 hover:text-gray-800"
      >
        Close
      </button>
      <h1 className="text-xl font-bold mb-4">Update Profile</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          {...register("email", { required: "Email is required" })}
          placeholder="Email"
          className="border p-2 rounded"
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}

        <input
          {...register("password")}
          type="password"
          placeholder="Password (optional)"
          className="border p-2 rounded"
        />

        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="border p-2 rounded"
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}

        <select {...register("role")} className="border p-2 rounded">
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>

        <input
          {...register("avatar", { required: "Avatar URL is required" })}
          placeholder="Avatar URL"
          className="border p-2 rounded"
        />
        {errors.avatar && (
          <span className="text-red-500">{errors.avatar.message}</span>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded mt-2 hover:bg-blue-600"
        >
          {isPending ? "Updating..." : "Update"}
        </button>

        {isError && (
          <p className="text-red-500 mt-2">Error updating profile.</p>
        )}
        {isSuccess && (
          <p className="text-green-500 mt-2">Profile updated successfully!</p>
        )}
      </form>
    </div>
  );
}
