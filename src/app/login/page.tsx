import { Suspense } from "react";
import { LoadingFallback } from "@/components/LoadingFallback";
import LoginForm from "./login-form";

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginForm />
    </Suspense>
  );
}
