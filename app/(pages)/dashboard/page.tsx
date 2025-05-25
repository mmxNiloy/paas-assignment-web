import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import getCurrentUser from "@/app/(server)/action/get-current-user.controller";
import { redirect } from "next/navigation";
import SiteConfig from "@/lib/site.config";
import SignOutButton from "@/components/custom/sign-out-button";

export async function generateMetadata(): Promise<Metadata> {
  const user = await getCurrentUser();
  return {
    title: [user?.name ?? "", SiteConfig.title.dashboard]
      .filter((item) => item.length > 0)
      .join(" | "),
    description: "Profile dashboard.",
  };
}

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/?error=session-expired");
  }

  return (
    <div className="flex flex-col h-full items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>User Dashboard</CardTitle>
          <CardDescription>Your account information</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-4">
          {user ? (
            <>
              <div>
                <h3 className="text-sm font-medium">Name</h3>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium">Email</h3>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
              <SignOutButton />
            </>
          ) : (
            <p className="text-sm text-muted-foreground">
              No user information available. Please sign in.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
