import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { QuestionCard } from "@/components/question-card";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { TagBadge } from "@/components/tag-badge";
import { Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getQuestions, getPopularTags } from "@/services/mock-data";
import { Question } from "@/types";
import { useIsMobile } from "@/hooks/use-mobile";

export interface TagBadgeProps {
  tag: string;
  className?: string;
  onClick?: () => void; // Ensure this is included
}


export default function Index() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [sortOption, setSortOption] = useState<
    "newest" | "votes" | "unanswered"
  >("newest");
  const [popularTags, setPopularTags] = useState<
    { name: string; count: number }[]
  >([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Simulate API loading delay
    setIsLoading(true);
    setTimeout(() => {
      const filteredQuestions = getQuestions(
        sortOption,
        selectedTag || undefined
      );
      setQuestions(filteredQuestions);
      setPopularTags(getPopularTags().slice(0, 10));
      setIsLoading(false);
    }, 500);
  }, [sortOption, selectedTag]);

  const handleTagClick = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value as "newest" | "votes" | "unanswered");
  };

  const TagBadge: React.FC<TagBadgeProps> = ({ tag, className, onClick }) => {
    return (
      <div
        className={`badge ${className} cursor-pointer`}
        onClick={onClick} // Ensure this is being used
      >
        {tag}
      </div>
    );
  };
  

  return (
    <AppLayout>
      <div className="flex flex-col gap-8 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <h1 className="text-3xl font-bold">EpiFlow Help Hub</h1>
          <SearchBar />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
              <div className="flex items-center gap-2 mb-4 sm:mb-0">
                <h2 className="text-xl font-semibold">Questions</h2>
                {selectedTag && (
                  <div className="flex items-center gap-1">
                    <span>tagged with:</span>
                    <TagBadge
                      tag="React"
                      className="bg-blue-500 text-white px-3 py-1 rounded-md cursor-pointer"
                      onClick={() => setSelectedTag(null)}
                    />

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-5 w-5 rounded-full"
                      onClick={() => setSelectedTag(null)}
                    >
                      ×
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Select value={sortOption} onValueChange={handleSortChange}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="votes">Most Upvoted</SelectItem>
                      <SelectItem value="unanswered">Unanswered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="space-y-4">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-40 bg-muted rounded-md animate-pulse-light"
                    />
                  ))}
              </div>
            ) : questions.length > 0 ? (
              <div className="space-y-4">
                {questions.map((question) => (
                  <QuestionCard key={question.id} question={question} />
                ))}
              </div>
            ) : (
              <div className="text-center p-10 bg-muted/50 rounded-lg">
                <h3 className="text-lg font-semibold">No questions found</h3>
                <p className="text-muted-foreground mt-2">
                  {selectedTag
                    ? `There are no questions tagged with "${selectedTag}" yet.`
                    : "Be the first to ask a question!"}
                </p>
                <Button className="mt-4" asChild>
                  <a href="/ask">Ask a Question</a>
                </Button>
              </div>
            )}
          </div>

          {/* Right sidebar - only shown on desktop */}
          <div className="hidden lg:block">
            <div className="bg-card rounded-lg shadow-sm p-5 sticky top-20">
              <h3 className="text-lg font-semibold mb-4">Popular Tags</h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <TagBadge
                    key={tag.name}
                    tag={tag.name}
                    className={`cursor-pointer ${
                      selectedTag === tag.name ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => handleTagClick(tag.name)}
                  />
                ))}
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Can't find an answer to your problem? Ask the community for
                  help!
                </p>
                <Button className="w-full" asChild>
                  <a href="/ask">Ask a Question</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <FloatingActionButton icon={<Plus className="h-5 w-5" />} href="/ask" />
    </AppLayout>
  );
}
