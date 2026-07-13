import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({
  className,
  type,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-11 w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-apple-text placeholder:text-apple-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/30",
        className
      )}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label
      className={cn("text-sm font-medium text-apple-text", className)}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-xl border border-black/10 bg-white px-4 py-2 text-sm text-apple-text placeholder:text-apple-text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-apple-blue/30",
        className
      )}
      {...props}
    />
  );
}
