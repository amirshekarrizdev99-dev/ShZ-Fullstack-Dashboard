import { Metadata } from "next";

import SignUpForm from "@/features/auth/components/SignUpForm";

export const metadata: Metadata = {
  title: "SignUp",
  description: "SignUp ",
  // other metadata
};

export default function SignUp() {
  return <SignUpForm />;
}
