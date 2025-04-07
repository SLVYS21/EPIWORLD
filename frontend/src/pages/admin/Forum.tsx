
import React from "react";
import AdminLayout from "@/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Search, AlertTriangle, Flag, ThumbsUp, ThumbsDown, Hash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ForumAdmin = () => {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Forum Management</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Flag className="mr-2 h-4 w-4" /> View Reported Content
            </Button>
            <Button className="bg-forum hover:bg-forum/90">
              <MessageSquare className="mr-2 h-4 w-4" /> Create Announcement
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">254</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Active Threads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">New Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">18</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Reported Content</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">5</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="threads">Threads</TabsTrigger>
            <TabsTrigger value="hashtags">Hashtags</TabsTrigger>
          </TabsList>
          
          <TabsContent value="posts" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Posts</CardTitle>
                <div className="flex items-center gap-2 mt-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input placeholder="Search posts..." className="pl-10" />
                  </div>
                  <Button variant="outline">Filter</Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Author</TableHead>
                      <TableHead>Thread</TableHead>
                      <TableHead>Engagement</TableHead>
                      <TableHead>Posted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          {["Need help with Math assignment", "Campus Event Announcement", "Lost my student ID", "Course registration help", "Study group for finals"][index]}
                          {index === 1 && (
                            <span className="ml-2 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs text-red-800">
                              <AlertTriangle className="mr-1 h-3 w-3" />
                              Reported
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          {["alex_student", "maria_johnson", "sam_wilson", "jay_parker", "taylor_smith"][index]}
                        </TableCell>
                        <TableCell>
                          {["Academics", "Campus Life", "Student Services", "Registration", "Study Groups"][index]}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <span className="flex items-center text-sm">
                              <ThumbsUp className="h-3 w-3 mr-1" />
                              {[12, 34, 8, 16, 22][index]}
                            </span>
                            <span className="flex items-center text-sm">
                              <ThumbsDown className="h-3 w-3 mr-1" />
                              {[2, 5, 1, 3, 4][index]}
                            </span>
                            <span className="flex items-center text-sm">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {[8, 12, 4, 9, 15][index]}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {["2h ago", "4h ago", "Yesterday", "2 days ago", "3 days ago"][index]}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="destructive">
                              Hide
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="flex items-center justify-end space-x-2 mt-4">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="threads" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Active Threads</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Academics", "Campus Life", "Student Services", "Registration", "Study Groups"].map((thread, index) => (
                    <div key={index} className="flex items-center justify-between border-b pb-2">
                      <div>
                        <h3 className="font-medium">{thread}</h3>
                        <p className="text-sm text-muted-foreground">
                          {[24, 45, 18, 12, 32][index]} posts • {[120, 230, 85, 64, 145][index]} comments
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Manage</Button>
                        {index === 0 && (
                          <Button size="sm" variant="outline" className="text-purple-600">
                            <Flag className="mr-1 h-4 w-4" /> Featured
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button className="w-full">Create New Thread</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="hashtags" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Hashtags</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-6">
                  {["#finals", "#help", "#events", "#academics", "#studentlife", "#clubs", "#campus", "#resources", "#study", "#food"].map((tag, index) => (
                    <div key={index} className="flex items-center gap-1 bg-muted rounded-full px-3 py-1">
                      <Hash className="h-3 w-3" />
                      <span className="text-sm">{tag.substring(1)}</span>
                      <span className="text-xs text-muted-foreground ml-1">
                        ({Math.floor(Math.random() * 100) + 10})
                      </span>
                    </div>
                  ))}
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Hashtag</TableHead>
                      <TableHead>Usage Count</TableHead>
                      <TableHead>Trending</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {["#finals", "#help", "#events", "#academics", "#studentlife"].map((tag, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{tag}</TableCell>
                        <TableCell>{[87, 65, 42, 38, 29][index]}</TableCell>
                        <TableCell>
                          {index < 2 ? (
                            <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs text-green-800">
                              +{[12, 8, 5, 3, 1][index]}% this week
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs text-gray-800">
                              Stable
                            </span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">View Posts</Button>
                            {index === 0 && (
                              <Button size="sm" variant="outline" className="text-purple-600">
                                Featured
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default ForumAdmin;
