import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getSiteContent } from "@/lib/content";
import { isAdminLoggedIn } from "@/lib/auth";
import { AdminEditor } from "@/components/AdminEditor";
import { LoginForm } from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Webara Admin",
  robots: {
    index: false,
    follow: false
  }
};

export default async function AdminPage({
  searchParams
}: {
  searchParams: Promise<{ login?: string }>;
}) {
  const loggedIn = await isAdminLoggedIn();
  const params = await searchParams;

  if (!loggedIn && params.login !== "1") {
    redirect("/admin?login=1");
  }

  if (!loggedIn) {
    return <LoginForm />;
  }

  const content = await getSiteContent();
  return <AdminEditor initialContent={content} />;
}
