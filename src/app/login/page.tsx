"use client";

import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import useUserStore from "../store";
// import useUserStore from "../store";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("올바른 이메일 형식이 아닙니다")
        .required("이메일은 필수입니다"),
      password: Yup.string()
        .min(8, "비밀번호는 최소 8자 이상이어야 합니다.")
        .matches(/[0-9]/, "비밀번호에 숫자가 최소 1개 이상 포함되어야 합니다.")
        .matches(
          /[a-zA-Z]/,
          "비밀번호에 영문자가 최소 1개 이상 포함되어야 합니다.",
        )
        .matches(
          /[!%*#?&]/,
          "비밀번호에 특수문자(!%*#?&)가 최소 1개 이상 포함되어야 합니다.",
        )
        .required(
          "비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합이어야 합니다.",
        ),
    }),
    onSubmit: async (values) => {
      console.log("login");
      const res = fetch("https://front-mission.bigs.or.kr/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          password: values.password,
        }),
      });

      const data = await (await res).json();

      if ((await res).ok) {
        setUser({
          username: values.username,
        });
        document.cookie = `accessToken=${data.accessToken}; path=/;`;
        document.cookie = `refreshToken=${data.refreshToken}; path=/;`;

        router.push("/");
      } else if ((await res).status == 400) {
        toast.error(data.message);
      } else {
        console.error("Login failed", data);
      }
    },
  });

  useEffect(() => {
    if (error === "token_expired") {
      console.log("error", error);
      toast.error("로그인이 필요합니다.");
    } else if (error === "unauthorized") {
      toast.error("세션이 만료되었습니다. 다시 로그인해주세요.");
    }
  }, [error]);

  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-28 lg:px-52">
      <div className="mt-10" />
      <div className="mt-48" />
      <div className="flex items-center justify-center">
        <div className="w-full">
          <p className="text-center text-4xl">로그인</p>
          <div className="mt-10" />
          <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
            <input
              value={formik.values.username}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="username"
              type="text"
              placeholder="이메일 형식"
              className="rounded-md border border-gray-300 p-3"
            />
            {formik.touched.username && formik.errors.username && (
              <p className="text-xs text-red-500">{formik.errors.username}</p>
            )}
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              // onKeyUp={(e) => {
              //   if (e.key === "Enter") handleLogin();
              // }}
              type="password"
              placeholder="비밀번호"
              className="rounded-md border border-gray-300 p-3"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
            <button
              className="rounded-md bg-gray-600 px-6 py-3 text-white shadow-md transition-all duration-200 hover:bg-gray-600 active:bg-gray-400 active:bg-opacity-80"
              // onClick={handleLogin}
              type="submit"
            >
              로그인
            </button>
          </form>
          <button
            className="mt-5 w-full rounded-md px-6 py-3 text-black shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
            onClick={() => router.push("/register")}
          >
            회원가입
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        // transition={Bounce}
      />
    </div>
  );
}
