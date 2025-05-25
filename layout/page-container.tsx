import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

interface IPageContainerProps extends React.HTMLAttributes<HTMLElement> {
  scrollable?: boolean;
}

const PageContainer = forwardRef<HTMLElement, IPageContainerProps>(
  ({ className, scrollable = false, ...props }, ref) => (
    <main
      ref={ref}
      className={cn(
        "min-h-[calc(100vh-4rem)]",
        scrollable
          ? "overflow-y-scroll"
          : "h-[calc(100vh-4rem)] overflow-y-clip",
        className
      )}
      {...props}
    ></main>
  )
);

PageContainer.displayName = "PageContainer";

export default PageContainer;
