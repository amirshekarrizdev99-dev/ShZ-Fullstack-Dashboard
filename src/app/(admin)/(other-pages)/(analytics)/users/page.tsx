import { Metadata } from "next";

import UsersPage from "@/features/users/components/UsersPage";

export const metadata: Metadata = {
  title: "Users",
  description: "Users ",
  // other metadata
};

function Users() {
  return <UsersPage />;
}

export default Users;
