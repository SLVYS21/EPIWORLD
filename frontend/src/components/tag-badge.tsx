
import { cn } from "@/lib/utils";

interface TagBadgeProps {
  tag: string;
  className?: string;
}

export function TagBadge({ tag, className }: TagBadgeProps) {
  // Map of tag names to their specific color classes
  const tagColorMap: Record<string, string> = {
    javascript: "bg-tag-javascript text-yellow-800",
    python: "bg-tag-python text-blue-800",
    react: "bg-tag-react text-blue-700",
    algebra: "bg-tag-algebra text-pink-700",
    physics: "bg-tag-physics text-green-700",
    chemistry: "bg-tag-chemistry text-yellow-700",
    english: "bg-tag-english text-gray-700",
    history: "bg-tag-history text-yellow-800",
    css: "bg-blue-100 text-blue-800",
    html: "bg-orange-100 text-orange-800",
    flexbox: "bg-purple-100 text-purple-800",
    hooks: "bg-cyan-100 text-cyan-800",
    math: "bg-pink-100 text-pink-800",
    calculus: "bg-red-100 text-red-800",
    integral: "bg-yellow-100 text-yellow-800",
    performance: "bg-green-100 text-green-800",
    loops: "bg-indigo-100 text-indigo-800",
    mechanics: "bg-amber-100 text-amber-800",
    "newtons-laws": "bg-lime-100 text-lime-800",
    shakespeare: "bg-fuchsia-100 text-fuchsia-800",
    literature: "bg-rose-100 text-rose-800"
  };
  
  // Default color if the tag doesn't have a specific color assigned
  const defaultColor = "bg-tag-default text-gray-700";
  
  return (
    <span className={cn(
      "tag",
      tagColorMap[tag.toLowerCase()] || defaultColor,
      className
    )}>
      {tag}
    </span>
  );
}
