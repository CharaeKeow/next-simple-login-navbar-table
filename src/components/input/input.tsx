import { cn } from "@/utils/cn";

// Initial thought is to straight away use `shadcn/ui` Input components, but decided against it since wanna use this opportunity to craft reusable component instead
export const Input = ({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
};
