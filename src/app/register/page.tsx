"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Header from "../(components)/Header";
import { toast, ToastContainer } from "react-toastify";

export default function RegisterPage() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      username: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("올바른 이메일 형식이 아닙니다")
        .required("이메일은 필수입니다"),
      name: Yup.string().required("이름은 필수입니다"),
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
      confirmPassword: Yup.string()
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
      console.log("register");
      const res = await fetch("https://front-mission.bigs.or.kr/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          name: values.name,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push("/login");
      } else if (res.status == 400) {
        if (data.username) {
          toast.error(data.username[0]);
        } else {
          toast.error(data.confirmPassword[0]);
        }
      }
    },
  });

  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />
      <div className="mt-48" />
      <div className="flex items-center justify-center">
        <div className="w-full">
          <p className="text-center text-4xl">회원가입</p>
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
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              type="text"
              placeholder="사용자 이름"
              className="rounded-md border border-gray-300 p-3"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-xs text-red-500">{formik.errors.name}</p>
            )}
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              placeholder="비밀번호"
              className="rounded-md border border-gray-300 p-3"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              className="rounded-md border border-gray-300 p-3"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
            <button
              className="rounded-md bg-gray-500 p-3 text-white"
              type="submit"
            >
              가입하기
            </button>
          </form>
          <button
            className="mt-5 w-full rounded-md px-6 py-3 text-black shadow-md ring-1 ring-gray-400 transition-all duration-200 active:bg-gray-400 active:bg-opacity-20"
            onClick={() => router.push("/login")}
          >
            로그인창으로
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
