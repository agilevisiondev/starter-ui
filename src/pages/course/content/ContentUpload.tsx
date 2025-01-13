import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardPage from "@/layouts/DashboardPage";

export default function ContentUpload() {
  const [chapterId, setChapterId] = useState("");
  const [theory, setTheory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting");
  };

  return (
    <DashboardPage className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Upload Course Content</h1>
      <Card>
        <CardHeader>
          <CardTitle>New Chapter Content</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="chapterSelect">Select Section / SubChapter</Label>
                <Select value={chapterId} onValueChange={setChapterId}>
                  <SelectTrigger id="chapterSelect">
                    <SelectValue placeholder="Select section" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="module1">Chapter 1</SelectItem>
                    <SelectItem value="module2">Chapter 2</SelectItem>
                    <SelectItem value="module3">Chapter 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="videoUpload">Video Lesson</Label>
              <Input id="videoUpload" type="file" accept="video/*" multiple />
            </div>

            <div className="space-y-2">
              <Label htmlFor="audioUpload">Audio Lesson</Label>
              <Input id="audioUpload" type="file" accept="audio/*" multiple />
            </div>

            <div className="space-y-2">
              <Label htmlFor="pdfUpload">PDF Materials</Label>
              <Input id="pdfUpload" type="file" accept=".pdf" multiple />
            </div>

            <div className="space-y-2">
              <Label htmlFor="imageUpload">Images</Label>
              <Input id="imageUpload" type="file" accept="image/*" multiple />
            </div>

            <div className="space-y-2">
              <Label htmlFor="theory">Chapter Theory / Plain Text</Label>
              <Textarea
                id="theory"
                value={theory}
                onChange={(e) => setTheory(e.target.value)}
                placeholder="Enter chapter theory or plain text"
                className="h-32"
              />
            </div>

            <Button type="submit" className="w-full">
              Upload Content
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardPage>
  );
}
