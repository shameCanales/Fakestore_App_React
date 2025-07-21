import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { useDispatch } from "react-redux";
import { authActions } from "../store/auth-slice";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    loginMutation.mutate(
      { email, password }, // Pass the email and password to the login mutation
      {
        // we can only pass the email and password and put the onSuccess and onError object inside the useLogin hoook because onSuccess and onError are the options of the useMutation hook. we can just add the options object inside the mutate function but it comes with cons so we stick to this setup  and not to our useQuery habit. and results are no need to pass onSuccess and onError repeatedly because it is now inside the useMutation setup. like mutaionFn, onSuccess, onError. 
        // our usequery habit like we learned in udemy keeps our component cleaner, promotes reusability of the hook, keeps logic near API, matches our habit but cons are slightly less flexible if handlers change per use, Harder to override globally if needed, and might add extra logic to hook
        onSuccess: (data) => {
          //data is the returned response from the loginUser function
          dispatch(authActions.login(data.access_token)); // pass the access token to the login action and update the state in the store
          navigate("/products"); // navigate to the products page after successful login
        },
        onError: () => {
          console.error("login failed");
        },
      }
    );
  };

  return (
    <div className="border-2 border-stone-900 w-[620px] mx-auto mt-25 p-10 rounded-3xl">
      <h1 className="montserrat-bold text-4xl">Login Ngani</h1>
      <p className="montserrat-medium mt-4 text-stone-600">
        Please enter your credentials
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col mt-5">
          <label className="montserrat-medium" htmlFor="email">
            Email Address
          </label>
          <input
            className="mt-2 border-1 border-stone-400 p-3 rounded-lg focus:outline-none montserrat-medium"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col mt-5">
          <label className="montserrat-medium" htmlFor="password">
            Password
          </label>
          <input
            className="mt-2 border-1 border-stone-400 p-3 rounded-lg focus:outline-none montserrat-medium"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="mt-5 bg-stone-900 text-stone-50 p-3 montserrat-medium text-xl"
        >
          {loginMutation.isPending ? "Logging in..." : "Continue"}
        </button>
      </form>
    </div>
  );
}

//credential for testing
// john@mail.com 
// changeme