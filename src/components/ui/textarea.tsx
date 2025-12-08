import * as React from "react";

import { cn } from "./utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "resize-none placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full bg-input-background px-3 py-2 text-base border-4 border-foreground shadow-[4px_4px_0px_0px_rgba(45,27,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(252,208,106,1)] transition-all outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus:translate-x-[2px] focus:translate-y-[2px] focus:shadow-[2px_2px_0px_0px_rgba(45,27,0,1)] dark:focus:shadow-[2px_2px_0px_0px_rgba(252,208,106,1)]",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };