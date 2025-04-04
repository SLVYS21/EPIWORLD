
import { Question } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { TagBadge } from "@/components/tag-badge";
import { Link } from "react-router-dom";
import { MessageSquare, Eye, ChevronUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface QuestionCardProps {
  question: Question;
}

export function QuestionCard({ question }: QuestionCardProps) {
  const {
    id,
    title,
    content,
    tags,
    createdAt,
    author,
    votes,
    answersCount,
    viewsCount,
  } = question;

  // Truncate content if it's too long
  const truncatedContent = content.length > 150
    ? `${content.substring(0, 150)}...`
    : content;

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow animate-fade-in">
      <CardContent className="p-5">
        <div className="flex items-start gap-4">
          <div className="hidden sm:flex flex-col items-center gap-1 pt-1">
            <div className="flex flex-col items-center">
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium">{votes}</span>
            </div>
            <div className="flex flex-col items-center mt-2">
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{answersCount}</span>
            </div>
            <div className="flex flex-col items-center mt-2">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs">{viewsCount}</span>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex justify-between items-start gap-2">
              <Link
                to={`/questions/${id}`}
                className="text-lg font-semibold hover:text-primary transition-colors line-clamp-2"
              >
                {title}
              </Link>
              
              <div className="flex items-center gap-2 sm:hidden">
                <div className="flex items-center gap-1">
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs">{votes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{answersCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs">{viewsCount}</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
              {truncatedContent}
            </p>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
              <Link
                to={`/users/${author.id}`}
                className="flex items-center gap-1 hover:text-foreground transition-colors"
              >
                <img
                  src={author.avatarUrl}
                  alt={author.name}
                  className="w-5 h-5 rounded-full object-cover"
                />
                <span>{author.name}</span>
              </Link>
              <span>
                asked {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
