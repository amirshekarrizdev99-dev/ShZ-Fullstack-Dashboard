import { Metadata } from "next";

import SignInForm from "@/features/auth/components/SignInForm";

export const metadata: Metadata = {
  title: "SignIn",
  description: "Signin",
};

export default function SignIn() {
  return <SignInForm />;
}
