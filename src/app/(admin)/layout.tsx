import React from "react";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import AdminLayoutClient from "../../layout/AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
