import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../UI/FormInput.jsx";
import FormLabel from "../../UI/FormLabel.jsx";
import { useCreateUser } from "../../hooks/useCreateUser.js";

export default function CreateUserPage() {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    mutate: createUser,
    isPending: isCreatingUser,
    isError: isCreateUserError,
    error: creatingUserError,
  } = useCreateUser();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    createUser(
      {
        name,
        email,
        password,
        avatar:
          "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fsearch%3Fq%3Davatar&psig=AOvVaw1GSo4Nfd20VN6GgS8nLcke&ust=1753324596746000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjhiKH50Y4DFQAAAAAdAAAAABAE",
      },
      {
        onSuccess: (data) => {
          console.log(data);
          navigate("/products");
        },
        onError: (error) => {
          console.error("creating user failed");
          console.error(error);
        },
      }
    );
  };

  {
    isCreateUserError && console.error(creatingUserError);
  }

  return (
    <div className="border-2 border-stone-900 w-[620px] mx-auto mt-25 p-10 rounded-3xl">
      <h1 className="montserrat-bold text-4xl">Create Account</h1>

      <p className="montserrat-medium mt-4 text-stone-600">
        Please fill in the details to create your account
      </p>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col mt-5">
          <FormLabel htmlFor="name">Name</FormLabel>

          <FormInput
            type="text"
            value={name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col mt-5">
          <FormLabel htmlFor="email">Email Address</FormLabel>

          <FormInput
            type="email"
            value={email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="flex flex-col mt-5">
          <FormLabel htmlFor="password">Password</FormLabel>

          <FormInput
            type="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
        </div>

        <Link to="/login">
          <p className="montserrat-medium underline underline-offset-4 mt-4">
            I Already have an account
          </p>
        </Link>

        <button
          type="submit"
          className="mt-5 w-full bg-stone-900 text-stone-50 p-3 montserrat-medium text-xl"
          disabled={isCreatingUser}
        >
          {isCreatingUser ? "Creating Account..." : "Continue"}
        </button>
      </form>
    </div>
  );
}
