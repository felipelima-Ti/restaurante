"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {

  const [cpf, setCpf] = useState("");

  const router = useRouter();

  const handleLogin = async () => {

    const response = await fetch("/api/admin-login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        cpf,
      }),
    });

    if (response.ok) {
      router.push(`/admin/orders?cpf=${cpf}`);
    } else {
      alert("CPF não autorizado");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">

      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">

        <h1 className="mb-4 text-2xl font-bold">
          Login Admin
        </h1>

        <input
          type="text"
          placeholder="Digite o CPF"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          className="w-full rounded-lg border p-3"
        />

        <button
          onClick={handleLogin}
          className="mt-4 w-full rounded-lg bg-black p-3 text-white"
        >
          Entrar
        </button>

      </div>
    </div>
  );
}