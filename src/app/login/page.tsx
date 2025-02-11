"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";

export default function LoginPage() {
  const router = useRouter();

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
          "비밀번호에 영문자가 최소 1개 이상 포함되어야 합니다."
        )
        .matches(
          /[!%*#?&]/,
          "비밀번호에 특수문자(!%*#?&)가 최소 1개 이상 포함되어야 합니다."
        )
        .required(
          "비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합이어야 합니다."
        ),
    }),
    onSubmit: async (values) => {
      console.log("폼 데이터:", values);
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
        localStorage.setItem("accessToken", data.accessToken);
      } else {
        console.error("Login failed", data);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen mx-5">
      <div className="w-full">
        <p className="text-4xl text-center">로그인</p>
        <div className="mt-10" />
        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
          <input
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="username"
            type="text"
            placeholder="이메일 형식"
            className="border border-gray-300 p-3 rounded-md"
          />
          {formik.touched.username && formik.errors.username && (
            <p>{formik.errors.username}</p>
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
            className="border border-gray-300 p-3 rounded-md"
          />
          {formik.touched.password && formik.errors.password && (
            <p>{formik.errors.password}</p>
          )}
          <button
            className="bg-gray-500 text-white p-3 rounded-md"
            // onClick={handleLogin}
            type="submit"
          >
            로그인
          </button>
          <button
            className="border border-gray-400  text-black p-3 rounded-md"
            onClick={() => router.push("/register")}
          >
            회원가입
          </button>
        </form>
      </div>
    </div>
  );
}
