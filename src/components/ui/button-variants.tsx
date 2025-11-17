import { cva, type VariantProps } from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary text-primary-foreground shadow-medium hover:shadow-strong",
        secondary: "bg-secondary text-secondary-foreground shadow-soft hover:shadow-medium",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        outline: "border-2 border-border bg-card hover:bg-accent hover:text-accent-foreground",
        success: "bg-success text-success-foreground shadow-soft hover:opacity-90",
        glassmorphic: "bg-primary-foreground/20 backdrop-blur text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/30",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2 text-xs",
        lg: "h-12 px-8 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
