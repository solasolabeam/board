"use client";

import { useRouter } from "next/navigation";
import useUserStore from "../store";

export default function Header() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const handleLogout = () => {
    document.cookie = "accessToken=; path=/; max-age=0;";
    document.cookie = "refreshToken=; path=/; max-age=0;";
    router.push("/login");
  };

  return (
    <div className="mx-5">
      <div className="flex justify-end gap-5">
        <p className="text-sm">{user?.username} 님</p> |
        <p className="cursor-pointer text-sm" onClick={handleLogout}>
          로그아웃
        </p>
      </div>
    </div>
  );
}
