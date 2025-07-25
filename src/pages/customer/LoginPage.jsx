import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router";
import { authActions } from "../../store/auth-slice";
import { useLogin } from "../../hooks/useLogin";
import { useGetProfileInfo } from "../../hooks/useGetProfileInfo";
import FormInput from "../../UI/FormInput";
import FormLabel from "../../UI/FormLabel";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = useSelector((state) => state.auth.token);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    mutate: login,
    isPending: isLoggingIn,
    isError: isLoginError,
    error: loginError,
  } = useLogin();

  const {
    data: profileData,
    isPending: gettingProfilePending,
    isError: errorGettingProfile,
    error: getProfileError,
  } = useGetProfileInfo(token, !!token);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    login(
      { email, password }, // Pass the email and password to the login mutation
      {
        // we can only pass the email and password and put the onSuccess and onError object inside the useLogin hoook because onSuccess and onError are the options of the useMutation hook. we can just add the options object inside the mutate function but it comes with cons so we stick to this setup  and not to our useQuery habit. and results are no need to pass onSuccess and onError repeatedly because it is now inside the useMutation setup. like mutaionFn, onSuccess, onError.
        // our usequery habit like we learned in udemy keeps our component cleaner, promotes reusability of the hook, keeps logic near API, matches our habit but cons are slightly less flexible if handlers change per use, Harder to override globally if needed, and might add extra logic to hook
        onSuccess: (data) => {
          //data is the returned response from the loginUser function
          dispatch(authActions.login(data.access_token)); // pass the access token to the login action and update the state in the store
          // navigate("/products"); // navigate to the products page after successful login
        },
        onError: () => {
          console.error("login failed");
        },
      }
    );
  };

  // waiting for token and checking if the user is admin or customer to navigate to respective routes
  useEffect(() => {
    if (!profileData || gettingProfilePending || !token) return; //without !token, it will produce an infinite loop

    if (profileData.role === "admin") {
      navigate("/admin/dashboard", { replace: true });
    } else if (profileData.role === "customer") {
      navigate("/admin", { replace: true });
    }

    dispatch(authActions.setProfileData(profileData));
  }, [profileData?.role, dispatch, navigate, token]); //profileData?.role because profileData?.role looks at role ('customer' or 'admin') while profiledata don't change still returns id, name, role(not checking it's inner content) it's the same. gets?

  return (
    <div className="border-2 border-stone-900 w-[620px] mx-auto mt-25 p-10 rounded-3xl">
      <h1 className="montserrat-bold text-4xl">Login Ngani</h1>
      <p className="montserrat-medium mt-4 text-stone-600">
        Please enter your credentials
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col mt-5">
          <FormLabel htmlFor="email">Email Address</FormLabel>

          <FormInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <FormLabel htmlFor="password">Password</FormLabel>

          <FormInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Link to="/create-user">
          <p className="montserrat-medium underline underline-offset-4 mt-4">
            doesn't have account yet?
          </p>
        </Link>

        <button
          type="submit"
          className="mt-5 bg-stone-900 text-stone-50 p-3 montserrat-medium text-xl"
          disabled={isLoggingIn}
        >
          {isLoggingIn ? "Logging in..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

//credential for testing customer
// john@mail.com
// changeme
