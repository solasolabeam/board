"use client";

import { useRouter } from "next/navigation";
import useUserStore from "../store";

export default function Header() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  return (
    <div>
      {user && (
        <div className="flex justify-end gap-5">
          <p className="text-sm">
            <span className="font-bold">{user.username}</span> 님
          </p>
          <p
            className="text-sm"
            onClick={() => {
              useUserStore.getState().setUser(null);
              localStorage.removeItem("accessToken");
              router.push("/login");
            }}
          >
            로그아웃
          </p>
        </div>
      )}
    </div>
  );
}
