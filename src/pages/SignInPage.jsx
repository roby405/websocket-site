import { useState } from "react";
import { useAuth } from "../components/sections/AuthContext.jsx";

const ServerLocation = "http://localhost:4000";

function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(`${ServerLocation}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      if (!res.ok) {
        throw new Error("backend response was not ok " + res.statusText);
      }
      const user = await res.json();
      const token = user.token;
      login(token, user);
      console.log("User signed in successfully:", user);
    } catch (error) {
      console.error("Unable to sign in:", error);
    }
  };

  return (
    <div className="flex flex-col h-full py-14 bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full w-4/6 bg-zinc-700 pt-2 pb-6 px-40 gap-2 rounded-lg mx-auto"
      >
        <h1 className="text-3xl font-bold mb-5">Sign In</h1>
        <label htmlFor="email" className="font-medium block text-xl">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="johnvolta@gmail.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="px-2 py-1 rounded bg-zinc-600 border border-zinc-800"
          required
        />
        <label htmlFor="password" className="font-medium block text-xl">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
          className="px-2 py-1 rounded bg-zinc-600 border border-zinc-800"
          required
          minLength="8"
          maxLength="24"
        />
        <button
          type="submit"
          className="bg-zinc-600 hover:bg-zinc-600 font-bold rounded-md mt-auto border-1 border-zinc-800"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SignInPage;