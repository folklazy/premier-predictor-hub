import { NavLink as RouterNavLink, NavLinkProps } from "react-router-dom";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NavLinkCompatProps extends Omit<NavLinkProps, "className" | "children"> {
  className?: string | ((props: { isActive: boolean; isPending: boolean }) => string);
  activeClassName?: string;
  pendingClassName?: string;
  children: ReactNode | ((props: { isActive: boolean; isPending: boolean }) => ReactNode);
}

export const NavLink = ({
  className,
  activeClassName,
  pendingClassName,
  to,
  children,
  ...props
}: NavLinkCompatProps) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive, isPending }) => {
        if (typeof className === "function") {
          return className({ isActive, isPending });
        }
        return cn(className, isActive && activeClassName, isPending && pendingClassName);
      }}
      {...props}
    >
      {({ isActive, isPending }) => {
        if (typeof children === "function") {
          return children({ isActive, isPending });
        }
        return children;
      }}
    </RouterNavLink>
  );
};
