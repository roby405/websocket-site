import { useState } from "react";
import { useAuth } from "../components/sections/AuthContext.jsx";

const ServerLocation = import.meta.env.VITE_API_BASE_URL;

function SignUpPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await fetch(`${ServerLocation}api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
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
      console.log("User signed up successfully:", user);
    } catch (error) {
      console.error("Unable to sign up:", error);
    }
  };

  return (
    <div className="flex flex-col h-full py-14 bg-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col h-full w-4/6 bg-zinc-700 pt-2 pb-6 px-40 gap-2 rounded-lg mx-auto"
      >
        <h1 className="text-3xl font-bold mb-5">Sign Up</h1>
        <label htmlFor="username" className="font-medium block">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="johnny404"
          value={formData.username}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
          className="px-2 py-1 rounded bg-zinc-600 border border-zinc-800"
          required
        />
        <label htmlFor="email" className="font-medium block">
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
        <label htmlFor="password" className="font-medium block">
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
        <label htmlFor="password" className="font-medium block">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={(e) =>
            setFormData({ ...formData, confirmPassword: e.target.value })
          }
          className="px-2 py-1 rounded bg-zinc-600 border border-zinc-800"
          required
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

export default SignUpPage;
