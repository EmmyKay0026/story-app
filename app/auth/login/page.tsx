import Login from "@/components/organisms/Login";
import React, { Suspense } from "react";

const LoginPage = () => {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
};

export default LoginPage;
