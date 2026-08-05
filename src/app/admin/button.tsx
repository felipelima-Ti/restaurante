"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  function logout() {
    localStorage.removeItem("cpf");
    router.replace("/admin");
    router.refresh();
  }

  return (
    <button
      onClick={logout}
      className="rounded-lg bg-red-500 px-4 py-2 text-white"
    >
      Sair
    </button>
  );
}