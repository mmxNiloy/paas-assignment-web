import { LoaderCircle } from "lucide-react";
import React from "react";

export default function SiteLoading() {
  return (
    <div className="flex flex-col gap-4 h-full items-center justify-center">
      <LoaderCircle className="animate-spin" />
      <p>Loading...</p>
    </div>
  );
}
