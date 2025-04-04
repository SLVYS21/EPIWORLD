
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

interface FloatingActionButtonProps {
  icon: ReactNode;
  href: string;
  className?: string;
}

export function FloatingActionButton({
  icon,
  href,
  className,
}: FloatingActionButtonProps) {
  return (
    <Link
      to={href}
      className={cn(
        "fixed bottom-6 right-6 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-200 hover:scale-105",
        className
      )}
    >
      {icon}
    </Link>
  );
}
