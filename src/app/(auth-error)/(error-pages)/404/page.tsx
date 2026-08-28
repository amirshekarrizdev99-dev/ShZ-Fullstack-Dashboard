import { Metadata } from "next";

import ErrorPage from "@/shared/components/errors/ErrorPage";
import AnimatedLogo404 from "@/shared/components/errors/404LogoAnimation";


export const metadata: Metadata = {
  title: "Error 404",
  description: "Error 404 ",
};

export default function Error404() {
  return (
    <ErrorPage
      title="ERROR 404"
      image={<AnimatedLogo404 />} 
      description="We can’t seem to find the page you are looking for!"
      buttonText="Back to Home Page"
      href="/"
    />
  );
}
