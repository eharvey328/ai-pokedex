"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Something went wrong!</h1>
        <p className="text-muted-foreground mb-6">
          {error.message || "An unexpected error occurred"}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Try again</Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/")}>
            Go home
          </Button>
        </div>
      </div>
    </div>
  );
}

// Made with Bob
