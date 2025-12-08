import * as React from "react";

import { cn } from "./utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 px-3 py-1 text-base bg-input-background border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(45,27,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(252,208,106,1)] transition-all outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(45,27,0,1)] dark:focus:shadow-[2px_2px_0px_0px_rgba(252,208,106,1)]",
        className,
      )}
      {...props}
    />
  );
}

export { Input };