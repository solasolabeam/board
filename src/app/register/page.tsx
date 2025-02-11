"use client";

import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import * as Yup from "yup";
import Header from "../(components)/Header";

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
          "비밀번호에 영문자가 최소 1개 이상 포함되어야 합니다."
        )
        .matches(
          /[!%*#?&]/,
          "비밀번호에 특수문자(!%*#?&)가 최소 1개 이상 포함되어야 합니다."
        )
        .required(
          "비밀번호는 8자 이상, 숫자, 영문자, 특수문자(!%*#?&) 1개 이상의 조합이어야 합니다."
        ),
      confirmPassword: Yup.string()
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

      if (res.ok) {
        router.push("/login");
      }
    },
  });

  return (
    <div className="mx-5">
      <div className="mt-10" />
      <Header />
      <div className="mt-48" />
      <div className="flex justify-center items-center">
        <div className="w-full">
          <p className="text-4xl text-center">회원가입</p>
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
              <p className="text-red-500 text-xs">{formik.errors.username}</p>
            )}
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="name"
              type="text"
              placeholder="사용자 이름"
              className="border border-gray-300 p-3 rounded-md"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-xs">{formik.errors.name}</p>
            )}
            <input
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="password"
              type="password"
              placeholder="비밀번호"
              className="border border-gray-300 p-3 rounded-md"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-xs">{formik.errors.password}</p>
            )}
            <input
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="confirmPassword"
              type="password"
              placeholder="비밀번호 확인"
              className="border border-gray-300 p-3 rounded-md"
            />
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-red-500 text-xs">
                  {formik.errors.confirmPassword}
                </p>
              )}
            <button
              className="bg-gray-500 text-white p-3 rounded-md"
              type="submit"
            >
              가입하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
