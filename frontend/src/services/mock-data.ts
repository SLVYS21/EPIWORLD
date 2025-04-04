
import { User, Question, Answer, Badge, Comment } from "@/types";

// Mock Users
export const users: User[] = [
  {
    id: "1",
    name: "Alex Johnson",
    username: "alexj",
    avatarUrl: "https://i.pravatar.cc/150?img=1",
    points: 1250,
    badges: [
      { id: "1", name: "Helpful", icon: "🌟", description: "Given 50 helpful answers" },
      { id: "2", name: "Expert", icon: "🎓", description: "Answered 100 questions" }
    ],
    joinedAt: "2023-01-15T10:30:00Z",
    questionsCount: 15,
    answersCount: 120
  },
  {
    id: "2",
    name: "Samantha Lee",
    username: "samlee",
    avatarUrl: "https://i.pravatar.cc/150?img=5",
    points: 2340,
    badges: [
      { id: "3", name: "Rising Star", icon: "⭐", description: "Got 10 accepted answers in a week" },
      { id: "4", name: "JS Pro", icon: "💻", description: "JavaScript expert" }
    ],
    joinedAt: "2023-02-20T14:45:00Z",
    questionsCount: 8,
    answersCount: 86
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    username: "miguelr",
    avatarUrl: "https://i.pravatar.cc/150?img=3",
    points: 860,
    badges: [
      { id: "5", name: "Quick Responder", icon: "⚡", description: "Usually responds within an hour" }
    ],
    joinedAt: "2023-03-10T09:15:00Z",
    questionsCount: 24,
    answersCount: 42
  },
  {
    id: "4",
    name: "Jessica Chen",
    username: "jesschen",
    avatarUrl: "https://i.pravatar.cc/150?img=9",
    points: 1780,
    badges: [
      { id: "6", name: "Problem Solver", icon: "🧩", description: "Solved 50 complex problems" },
      { id: "7", name: "Math Wizard", icon: "🧮", description: "Expert in mathematics" }
    ],
    joinedAt: "2023-01-05T11:20:00Z",
    questionsCount: 12,
    answersCount: 95
  }
];

// Mock Questions
export const questions: Question[] = [
  {
    id: "1",
    title: "How do I center a div with Flexbox?",
    content: "I'm trying to center a div horizontally and vertically inside a container using Flexbox. I've tried using justify-content: center and align-items: center, but it's not working as expected. Here's my code...",
    tags: ["css", "flexbox", "html"],
    createdAt: "2023-07-10T15:30:00Z",
    updatedAt: "2023-07-10T15:30:00Z",
    authorId: "3",
    author: users[2],
    votes: 15,
    answersCount: 3,
    viewsCount: 128
  },
  {
    id: "2",
    title: "Understanding React hooks dependency array",
    content: "I'm confused about when to include variables in the dependency array of useEffect. Sometimes I get warnings when I don't include certain variables, but when I include them, my effect runs too often. Can someone explain the best practices?",
    tags: ["javascript", "react", "hooks"],
    createdAt: "2023-07-12T10:15:00Z",
    updatedAt: "2023-07-12T14:30:00Z",
    authorId: "4",
    author: users[3],
    votes: 42,
    answersCount: 5,
    viewsCount: 312,
    imageUrl: "https://i.imgur.com/QH9hrSU.png"
  },
  {
    id: "3",
    title: "How to solve this calculus integral?",
    content: "I need help with this integral: ∫(x²+3x+2)/(x+1) dx. I've tried using substitution but I'm stuck on how to proceed.",
    tags: ["math", "calculus", "integral"],
    createdAt: "2023-07-14T09:45:00Z",
    updatedAt: "2023-07-14T09:45:00Z",
    authorId: "1",
    author: users[0],
    votes: 8,
    answersCount: 2,
    viewsCount: 76
  },
  {
    id: "4",
    title: "Python list comprehension vs. traditional for loop",
    content: "What are the performance implications of using list comprehension versus a traditional for loop in Python? Is one method preferred over the other for large data sets?",
    tags: ["python", "performance", "loops"],
    createdAt: "2023-07-15T16:20:00Z",
    updatedAt: "2023-07-15T18:45:00Z",
    authorId: "2",
    author: users[1],
    votes: 31,
    answersCount: 4,
    viewsCount: 210
  },
  {
    id: "5",
    title: "Newton's Second Law problem - force calculation",
    content: "A 5kg object is being pushed with a force of 20N. There's a friction force of 5N opposing the movement. What is the acceleration of the object?",
    tags: ["physics", "mechanics", "newtons-laws"],
    createdAt: "2023-07-16T11:30:00Z",
    updatedAt: "2023-07-16T11:30:00Z",
    authorId: "4",
    author: users[3],
    votes: 12,
    answersCount: 2,
    viewsCount: 95
  },
  {
    id: "6",
    title: "Shakespeare's use of dramatic irony in Romeo and Juliet",
    content: "I'm writing an essay on Shakespeare's use of dramatic irony in Romeo and Juliet. Can anyone provide examples of dramatic irony in the play and explain how it enhances the tragic elements?",
    tags: ["english", "shakespeare", "literature"],
    createdAt: "2023-07-17T13:40:00Z",
    updatedAt: "2023-07-17T13:40:00Z",
    authorId: "3",
    author: users[2],
    votes: 7,
    answersCount: 1,
    viewsCount: 48
  }
];

// Mock Answers
export const answers: Answer[] = [
  {
    id: "1",
    content: "To center a div with Flexbox, make sure your container has both **display: flex** along with **justify-content: center** and **align-items: center**. This will center the child div both horizontally and vertically. If it's not working, check if there are any conflicting styles or if the container has a specified height.",
    createdAt: "2023-07-10T16:15:00Z",
    updatedAt: "2023-07-10T16:15:00Z",
    authorId: "2",
    author: users[1],
    questionId: "1",
    votes: 18,
    isAccepted: true
  },
  {
    id: "2",
    content: "For React hooks dependency arrays, include all variables that your effect uses that might change over time. This ensures your effect runs when those values change. However, be careful with objects and functions - they can cause your effect to run too often due to reference equality. Consider using useCallback or useMemo for those cases, or restructure your effect to only depend on primitive values.",
    createdAt: "2023-07-12T11:20:00Z",
    updatedAt: "2023-07-12T11:20:00Z",
    authorId: "1",
    author: users[0],
    questionId: "2",
    votes: 25,
    isAccepted: true
  },
  {
    id: "3",
    content: "To solve this integral, rewrite it as a polynomial plus a fraction: ∫(x²+3x+2)/(x+1) dx = ∫(x+1+1/(x+1)) dx = ∫x dx + ∫1 dx + ∫1/(x+1) dx = x²/2 + x + ln|x+1| + C",
    createdAt: "2023-07-14T10:30:00Z",
    updatedAt: "2023-07-14T10:30:00Z",
    authorId: "4",
    author: users[3],
    questionId: "3",
    votes: 12,
    isAccepted: true
  },
  {
    id: "4",
    content: "In Python, list comprehensions are generally more efficient than traditional for loops for creating lists, as they're optimized at the C level. They're also more readable for simple operations. However, for complex operations or when you need more control flow, traditional loops might be clearer. For very large datasets, consider generators instead of building the whole list at once.",
    createdAt: "2023-07-15T17:10:00Z",
    updatedAt: "2023-07-15T17:10:00Z",
    authorId: "3",
    author: users[2],
    questionId: "4",
    votes: 19,
    isAccepted: false
  },
  {
    id: "5",
    content: "Using Newton's Second Law (F=ma): The net force is 20N - 5N = 15N. Therefore, a = F/m = 15N/5kg = 3m/s². The object accelerates at 3 meters per second squared.",
    createdAt: "2023-07-16T12:15:00Z",
    updatedAt: "2023-07-16T12:15:00Z",
    authorId: "1",
    author: users[0],
    questionId: "5",
    votes: 9,
    isAccepted: true
  },
  {
    id: "6",
    content: "A powerful example of dramatic irony in Romeo and Juliet is when Romeo believes Juliet is dead and kills himself, while the audience knows she's only sleeping due to a potion. This creates tension and enhances the tragedy because we know their deaths could have been avoided with better communication. Shakespeare uses this technique to highlight the theme of fate vs. free will.",
    createdAt: "2023-07-17T14:30:00Z",
    updatedAt: "2023-07-17T14:30:00Z",
    authorId: "2",
    author: users[1],
    questionId: "6",
    votes: 11,
    isAccepted: true
  }
];

// Mock Comments
export const comments: Comment[] = [
  {
    id: "1",
    content: "Could you provide a code example? It would be easier to understand.",
    createdAt: "2023-07-10T17:00:00Z",
    authorId: "4",
    author: users[3],
    parentId: "1",
    parentType: "answer"
  },
  {
    id: "2",
    content: "Great explanation! This really helped me understand the concept better.",
    createdAt: "2023-07-12T12:40:00Z",
    authorId: "3",
    author: users[2],
    parentId: "2",
    parentType: "answer"
  },
  {
    id: "3",
    content: "I think there's a mistake in your solution. The derivative of x² is 2x, not x.",
    createdAt: "2023-07-14T11:15:00Z",
    authorId: "2",
    author: users[1],
    parentId: "3",
    parentType: "question"
  },
  {
    id: "4",
    content: "Could you explain more about generators for large datasets?",
    createdAt: "2023-07-15T18:30:00Z",
    authorId: "1",
    author: users[0],
    parentId: "4",
    parentType: "answer"
  }
];

// Get questions with filters
export const getQuestions = (
  sort: 'newest' | 'votes' | 'unanswered' = 'newest',
  tag?: string,
  searchQuery?: string
): Question[] => {
  let filteredQuestions = [...questions];
  
  // Filter by tag if provided
  if (tag) {
    filteredQuestions = filteredQuestions.filter(q => 
      q.tags.includes(tag.toLowerCase())
    );
  }
  
  // Filter by search query if provided
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredQuestions = filteredQuestions.filter(q => 
      q.title.toLowerCase().includes(query) || 
      q.content.toLowerCase().includes(query) ||
      q.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Sort questions
  switch (sort) {
    case 'newest':
      return filteredQuestions.sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case 'votes':
      return filteredQuestions.sort((a, b) => b.votes - a.votes);
    case 'unanswered':
      return filteredQuestions.filter(q => q.answersCount === 0)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    default:
      return filteredQuestions;
  }
};

// Get a question by ID
export const getQuestionById = (id: string): Question | undefined => {
  return questions.find(q => q.id === id);
};

// Get answers for a question
export const getAnswersByQuestionId = (questionId: string): Answer[] => {
  return answers.filter(a => a.questionId === questionId)
    .sort((a, b) => {
      // Sort by accepted first, then by votes
      if (a.isAccepted !== b.isAccepted) {
        return a.isAccepted ? -1 : 1;
      }
      return b.votes - a.votes;
    });
};

// Get comments for a question or answer
export const getComments = (parentId: string, parentType: 'question' | 'answer'): Comment[] => {
  return comments.filter(c => c.parentId === parentId && c.parentType === parentType)
    .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
};

// Get popular tags
export const getPopularTags = (): { name: string; count: number }[] => {
  const tagCounts = questions.flatMap(q => q.tags)
    .reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  
  return Object.entries(tagCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
};

// Get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(u => u.id === id);
};
