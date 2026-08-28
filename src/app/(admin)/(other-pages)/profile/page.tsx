import { Metadata } from "next";

import ProfilePageContent from "./content/ProfilePageContent";

export const metadata: Metadata = {
  title: "Profile",
  description: "Profile",
};

export default function Profile() {
  return <ProfilePageContent />;
}
