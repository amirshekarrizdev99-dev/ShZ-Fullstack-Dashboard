import { Metadata } from "next";

import ErrorPage from "@/shared/components/errors/ErrorPage";
import AnimatedLogo500 from "@/shared/components/errors/500LogoAnimation";

export const metadata: Metadata = {
  title: "Error 500",
  description: "Error 500 ",
};

export default function Error500() {
  return (
    <ErrorPage
      title="ERROR 500"
      image={<AnimatedLogo500 />} 
      description="Sorry...Try again later."
      buttonText="Back to Home Page"
      href="/"
    />
  );
}
