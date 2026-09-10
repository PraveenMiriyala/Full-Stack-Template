"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { siteConfig } from "@/config/site";
import { LogIn, LogOut, UserPlus, Shield } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session, isPending } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center space-x-2 text-xl font-bold"
        >
          <Shield className="h-6 w-6 text-primary" />
          <span>{siteConfig.name}</span>
        </Link>

        <nav className="flex items-center space-x-4">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/"
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            }`}
          >
            Home
          </Link>
          <Link
            href="/dashboard"
            className={`text-sm font-medium transition-colors hover:text-primary ${
              pathname === "/dashboard"
                ? "font-semibold text-primary"
                : "text-muted-foreground"
            }`}
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center space-x-3">
          {isPending ? (
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          ) : session ? (
            <div className="flex items-center space-x-3">
              <span className="hidden text-sm font-medium text-muted-foreground md:inline">
                {session.user?.email}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut()}
                className="gap-1.5"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/sign-in" className="gap-1.5">
                  <LogIn className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link href="/sign-up" className="gap-1.5">
                  <UserPlus className="h-4 w-4" />
                  Sign Up
                </Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
