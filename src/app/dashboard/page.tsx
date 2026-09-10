import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  UserCheck,
  KeyRound,
  Server,
  ExternalLink,
} from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <div className="container space-y-8 py-10">
      <div className="flex flex-col justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Protected Dashboard
          </h1>
          <p className="mt-1 text-muted-foreground">
            Server-side authenticated session overview powered by Better Auth &
            Next.js Server Components.
          </p>
        </div>
        <Badge variant="default" className="w-fit gap-1 px-3 py-1 text-sm">
          <UserCheck className="h-4 w-4" />
          Authenticated Session
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <ShieldCheck className="h-5 w-5 text-primary" />
              Authenticated User Details
            </CardTitle>
            <CardDescription>
              Verified via server-side session cookies and Better Auth API.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  User ID
                </p>
                <p className="mt-1 break-all font-mono text-sm">
                  {session.user.id}
                </p>
              </div>
              <div className="rounded-lg bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Full Name
                </p>
                <p className="mt-1 text-sm font-medium">{session.user.name}</p>
              </div>
              <div className="rounded-lg bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Email Address
                </p>
                <p className="mt-1 text-sm font-medium">{session.user.email}</p>
              </div>
              <div className="rounded-lg bg-muted/60 p-4">
                <p className="text-xs font-semibold uppercase text-muted-foreground">
                  Email Verified
                </p>
                <p className="mt-1 text-sm font-medium">
                  {session.user.emailVerified
                    ? "Verified"
                    : "Pending Verification"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <Server className="h-5 w-5 text-primary" />
              Session Info
            </CardTitle>
            <CardDescription>Active token & security status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2 rounded bg-muted/60 p-3 text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Session Token:</span>
                <span className="font-mono font-medium">Valid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Expires At:</span>
                <span className="font-mono">
                  {new Date(session.session.expiresAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                variant="outline"
                className="w-full gap-2 text-xs"
                asChild
              >
                <a
                  href="/api/protected"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <KeyRound className="h-3.5 w-3.5" />
                  Test Protected API Route
                  <ExternalLink className="ml-auto h-3 w-3" />
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
