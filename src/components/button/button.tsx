import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";

// Note: Idea for going this way is, besides learning how to build component like shadcn/ui, this allows us to easily add more variants and sizes as well
export const buttonVariants = cva(
  "rounded-[4px] transition-colors disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        default: "bg-primary text-black shadow hover:bg-primary/90",
      },
      size: {
        default: "h-9 px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
