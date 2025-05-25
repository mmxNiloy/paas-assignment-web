"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useMemo } from "react";
import { toast } from "sonner";

export default function ErrorToaster() {
  const params = useSearchParams();
  const error = useMemo(() => params.get("error"), [params]);

  useEffect(() => {
    if (error) {
      toast.error("Session Expired. Please login again.");
    }
  }, [error]);

  return <></>;
}
