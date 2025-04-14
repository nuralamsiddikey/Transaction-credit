"use client";

import { useAuth } from "@/context/authContext";
import { log } from "console";
import { useRouter } from "next/navigation";
import { useState } from "react";


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login ,user} = useAuth();


  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`${baseURL}/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        setIsLoading(false);
        const result = await res.json();
        login(result.data.accessToken, result.data.user);
        if (result.data.user.isAdmin) router.push("/admin");
        else router.push("/users");
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <input
        className="border p-2 w-full"
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        className="border p-2 w-full"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={handleLogin}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <div className="border p-4 mt-4 rounded shadow bg-white">
        <p>Admin credentials:</p>
        <p>Username: admin</p>
        <p>Password: 123456</p>
      </div>
      <div className="border p-4 mt-4 rounded shadow bg-white">
        <p>User credentials:</p>
        <p>Username: user</p>
        <p>Password: 123456</p>
      </div>
    </div>
  );
}
