import { ContentSidebar } from "@/pages/course/content/content-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, PlayCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPage from "@/layouts/DashboardPage";

const Content = () => {
  const handlenext = () => {
    console.log("");
  };
  return (
    <DashboardPage>
      <div className="flex">
        <ContentSidebar className="w-56" />
        <header className="sticky right-0 z-10 items-center gap-2 px-6 border-b top-20 bg-background shrink-0">
          <h1 className="text-5xl font-medium">React Introduction</h1>
          <div className="flex justify-between my-6">
            <Button size="sm" className="dark:bg-white">
              <ChevronLeft />
              Prev
            </Button>
            <Button size="sm" className="dark:bg-white">
              Next
              <ChevronRight />
            </Button>
          </div>
          <div className="p-5 space-y-10">
            <div>
              <p className="mb-4 text-2xl font-medium">Video Lesson</p>
              <div className="overflow-hidden bg-black rounded-lg aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/Y6aYx_KKM7A"
                  title="Course Video"
                  allow="autoplay; encrypted-media;"
                  allowFullScreen
                ></iframe>
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
                <Button className="dark:bg-white">
                  <Download className="w-4 h-4 mr-2" /> Download PDF Notes
                </Button>
                <Button variant="outline">
                  <PlayCircle className="w-4 h-4 mr-2" /> Play Audio Lesson
                </Button>
              </div>
            </div>
            {/* <Tabs defaultValue="theory" className="mb-8">
            <TabsList>
              <TabsTrigger value="theory">Theory</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
            </TabsList>
            <TabsContent value="theory">
              <Card>
                <CardContent className="p-6 prose max-w-none">
                  <h1 className="mb-4 text-2xl font-medium">
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
                    Consequatur perferendis nisi fuga ea modi, earum cupiditate
                    vero pariatur quas soluta similique autem consectetur! Rem
                    tempore officiis, modi sit recusandae impedit.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="images">
              <Card>
                <CardContent className="p-6">
                  <div className="relative overflow-hidden rounded-lg aspect-video">
                    <img
                      src="https://miro.medium.com/v2/resize:fit:1400/1*LhEgzn_fJ2KmBc8Ld7mEfA.png"
                      alt=""
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute transform -translate-y-1/2 left-2 top-1/2"
                      onClick={handlenext}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="absolute transform -translate-y-1/2 right-2 top-1/2"
                      onClick={handlenext}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs> */}
          </div>
        </header>
      </div>
    </DashboardPage>
  );
};

export default Content;
