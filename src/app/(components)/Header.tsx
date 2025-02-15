"use client";

import { useRouter } from "next/navigation";
import useUserStore from "../store";

export default function Header() {
  const router = useRouter();
  const handleLogout = () => {
    useUserStore.getState().setUser(null);
    document.cookie = "accessToken=; path=/; max-age=0;";
    document.cookie = "refreshToken=; path=/; max-age=0;";
    router.push("/login");
  };

  return (
    <div>
      <div className="flex justify-end gap-5">
        <p className="cursor-pointer text-sm" onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </div>
  );
}
