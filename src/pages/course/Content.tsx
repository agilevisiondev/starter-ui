import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ChevronLeft, ChevronRight, Download, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Content = () => {
  const handlenext = () => {
    console.log("");
  };
  return (
    <div className="p-2 rounded-lg">
      <SidebarProvider>
        <AppSidebar className="ml-[267px] mt-20" />
        <SidebarInset>
          <header className="sticky top-0 bg-background shrink-0 items-center gap-2 border-b px-6 z-10">
            <div className="flex mt-4">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-5xl font-medium ml-5">React Introduction</h1>
            </div>
            <div className="flex justify-between my-6">
              <Button size="sm">
                <ChevronLeft />
                Prev
              </Button>
              <Button size="sm">
                Next
                <ChevronRight />
              </Button>
            </div>
          </header>
          <div className="p-5 space-y-10">
            <div className="">
              <p className="text-2xl font-medium mb-4">Video Lesson</p>
              <div className="aspect-video overflow-hidden rounded-lg bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Y6aYx_KKM7A"
                  title="Course Video"
                  allow=" autoplay; encrypted-media;"
                  allowFullScreen></iframe>
              </div>
            </div>
            <div className="">
              <h2 className="mb-4 text-xl font-semibold">Audio Lesson</h2>
              <audio controls className="w-full">
                <source src="/xyz.mp3" type="audio/mpeg" />
              </audio>
            </div>
            <div className="mb-8">
              <h2 className="mb-4 text-xl font-semibold">Course Materials</h2>
              <div className="flex space-x-4">
                <Button>
                  <Download className="mr-2 h-4 w-4" /> Download PDF Notes
                </Button>
                <Button variant="outline">
                  <PlayCircle className="mr-2 h-4 w-4" /> Play Audio Lesson
                </Button>
              </div>
            </div>
            <Tabs defaultValue="theory" className="mb-8">
              <TabsList>
                <TabsTrigger value="theory">Theory</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="theory">
                <Card>
                  <CardContent className="prose max-w-none p-6">
                    <h1 className="text-2xl font-medium mb-4">
                      Introduction to React Components
                    </h1>
                    <p>
                      React components are the building blocks of React
                      applications. They are reusable pieces of code that return
                      React elements to be rendered to the page.
                    </p>
                    <h4>Types of Components</h4>
                    <ul>
                      <li>Functional Components</li>
                      <li>Class Components</li>
                    </ul>
                    <p>
                      <b>
                        In modern React development, functional components with
                        hooks are preferred due to their simplicity
                      </b>
                      and ease of use. Lorem ipsum dolor sit amet consectetur
                      adipisicing elit. Debitis, aspernatur! Omnis delectus
                      mollitia repellat laudantium corporis facilis adipisci non
                      hic et eius ipsum, aperiam explicabo fugiat corrupti unde?
                      Consequatur perferendis nisi fuga ea modi, earum
                      cupiditate vero pariatur quas soluta similique autem
                      consectetur! Rem tempore officiis, modi sit recusandae
                      impedit.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="images">
                <Card>
                  <CardContent className="p-6">
                    <div className="relative aspect-video overflow-hidden rounded-lg">
                      <img
                        src="https://miro.medium.com/v2/resize:fit:1400/1*LhEgzn_fJ2KmBc8Ld7mEfA.png"
                        alt=""
                      />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute left-2 top-1/2 -translate-y-1/2 transform"
                        onClick={handlenext}>
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2 transform"
                        onClick={handlenext}>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Content;
