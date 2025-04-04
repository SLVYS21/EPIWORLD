
import { useState } from "react";
import { ChevronUp, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface VoteButtonsProps {
  initialVotes: number;
  isAccepted?: boolean;
  onAccept?: () => void;
  className?: string;
  orientation?: "vertical" | "horizontal";
  showAccept?: boolean;
  canAccept?: boolean;
}

export function VoteButtons({
  initialVotes,
  isAccepted = false,
  onAccept,
  className,
  orientation = "vertical",
  showAccept = false,
  canAccept = false
}: VoteButtonsProps) {
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState<"up" | "down" | null>(null);
  const { toast } = useToast();
  
  const handleVote = (direction: "up" | "down") => {
    // If already voted in the same direction, undo the vote
    if (userVote === direction) {
      setVotes(votes + (direction === "up" ? -1 : 1));
      setUserVote(null);
      toast({ 
        title: "Vote removed",
        description: "Your vote has been removed."
      });
      return;
    }
    
    // If already voted in the opposite direction, change the vote
    if (userVote) {
      setVotes(votes + (direction === "up" ? 2 : -2));
    } else {
      setVotes(votes + (direction === "up" ? 1 : -1));
    }
    
    setUserVote(direction);
    toast({ 
      title: direction === "up" ? "Upvoted" : "Downvoted",
      description: `You've ${direction === "up" ? "upvoted" : "downvoted"} this post.`
    });
  };
  
  const handleAccept = () => {
    onAccept?.();
    toast({ 
      title: "Answer accepted",
      description: "This answer has been marked as accepted."
    });
  };
  
  return (
    <div 
      className={cn(
        "flex items-center gap-1",
        orientation === "vertical" ? "flex-col" : "flex-row",
        className
      )}
    >
      <button
        onClick={() => handleVote("up")}
        className={cn(
          "p-1 rounded hover:bg-muted transition-colors",
          userVote === "up" && "text-green-500"
        )}
        aria-label="Vote up"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
      
      <span className={cn(
        "text-sm font-medium",
        votes > 0 ? "text-green-600" : votes < 0 ? "text-red-600" : "text-gray-500"
      )}>
        {votes}
      </span>
      
      <button
        onClick={() => handleVote("down")}
        className={cn(
          "p-1 rounded hover:bg-muted transition-colors",
          userVote === "down" && "text-red-500"
        )}
        aria-label="Vote down"
      >
        <ChevronDown className="h-5 w-5" />
      </button>
      
      {showAccept && (
        <button
          onClick={handleAccept}
          disabled={!canAccept || isAccepted}
          className={cn(
            "p-1 rounded transition-colors ml-2",
            isAccepted 
              ? "text-green-500" 
              : canAccept 
                ? "hover:bg-muted text-muted-foreground hover:text-green-500" 
                : "text-muted-foreground opacity-50 cursor-not-allowed"
          )}
          aria-label={isAccepted ? "Accepted answer" : "Mark as accepted"}
        >
          <Check className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
