"use client";

import { UserContext } from "@/context/user.context";
import { useRouter } from "next/navigation";
import { use } from "react";

const LoginPage = () => {
  const { setUser } = use(UserContext);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email === "user@example.com" && password === "1234") {
      const currentUser = {
        email,
        name: email?.split("@")?.[0],
      };
      setUser(currentUser);
      alert("Login successful");
      router.push("/dashboard");
    } else {
      alert("Credential invalid!");
      setUser(null);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="mt-2 text-sm text-gray-600">
          Login to continue to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          {/* Email */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              className="w-full rounded-xl border px-4 py-3 text-sm outline-none focus:border-black focus:ring-1 focus:ring-black text-black"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full rounded-xl bg-black py-3 text-sm font-semibold text-white transition hover:bg-gray-900 disabled:opacity-50"
          >
            Login
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="font-medium text-black hover:underline"
          >
            Sign up
          </a>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
