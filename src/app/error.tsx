"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error caught:", error);
  }, [error]);

  return (
    <div className="container flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full bg-destructive/10 p-4 text-destructive">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Something went wrong!
      </h2>
      <p className="mb-6 max-w-md text-muted-foreground">
        An unexpected error occurred. Please try refreshing or click below to
        retry.
      </p>
      <Button onClick={() => reset()}>Try Again</Button>
    </div>
  );
}
