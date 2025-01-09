import { ContentSidebar } from "@/pages/course/content/content-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPage from "@/layouts/DashboardPage";
import { useMediaQuery } from "@react-hook/media-query";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const Content = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const isTabView = useMediaQuery("only screen and (min-width: 769px)");
  const sidebarRef = useRef<HTMLDivElement>(null);

  const videos = [
    "https://www.youtube.com/embed/Y6aYx_KKM7A",
    "https://www.youtube.com/embed/eILUmCJhl64",
    "https://www.youtube.com/embed/NkwFxeHARqc",
  ];
  const pdfFiles = [
    { name: "PDF 1", path: "/path/to/pdf1.pdf", icon: "/pdf.png" },
    { name: "PDF 2", path: "/path/to/pdf2.pdf", icon: "/pdf.png" },
    { name: "PDF 3", path: "/path/to/pdf2.pdf", icon: "/pdf.png" },
    { name: "PDF 4", path: "/path/to/pdf2.pdf", icon: "/pdf.png" },
    { name: "PDF 5", path: "/path/to/pdf2.pdf", icon: "/pdf.png" },
  ];

  const handleVideoNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };

  const handleVideoPrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };
  const handleImagenext = () => {
    console.log("");
  };
  const handleToggle = () => {
    setShowSidebar(!showSidebar);
  };
  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && event.target instanceof HTMLElement) {
      if (!sidebarRef.current.contains(event.target)) {
        setShowSidebar(false);
      }
    }
  };

  useEffect(() => {
    if (!isTabView) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isTabView]);
  return (
    <DashboardPage>
      <div className="flex">
        <div
          ref={sidebarRef}
          className={clsx({
            "absolute z-20 h-screen top-0 left-0 bg-gray-50 transition-transform ease-in-out duration-300 transform translate-x-0":
              !isTabView && showSidebar,
            "absolute z-20 h-screen top-0 -left-96 bg-gray-50 transition-transform ease-in-out duration-300 transform -translate-x-full":
              !isTabView && !showSidebar,
            "h-[calc(100vh-100px)] sticky top-0": isTabView,
          })}
        >
          <ContentSidebar className={`${isTabView ? "w-56" : "w-64"}`} />
        </div>
        <div>
          <header className="sticky right-0 z-10 items-center gap-2 py-2 px-6 border-b top-0 bg-background shrink-0">
            <h1 className="text-3xl font-medium">React Introduction</h1>
            {!isTabView && (
              <span onClick={handleToggle} className="my-2 flex text-sm text-blue-800 rounded-lg items-center">
                <ChevronLeft className="size-4" />
                view chapters
              </span>
            )}
          </header>
          <div className="p-5 space-y-10">
            <div>
              <p className="mb-4 text-2xl font-medium">Video Lesson</p>
              <div className="relative overflow-hidden bg-black rounded-lg aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={videos[currentVideoIndex]}
                  title="Course Video"
                  allow="autoplay; encrypted-media;"
                  allowFullScreen
                ></iframe>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute transform -translate-y-1/2 left-2 top-1/2"
                  onClick={handleVideoPrev}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute transform -translate-y-1/2 right-2 top-1/2"
                  onClick={handleVideoNext}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold">Audio Lesson</h2>
              <div className="flex gap-4 overflow-x-auto">
                {Array(5)
                  .fill(0)
                  .map((index) => (
                    <div key={index} className="min-w-[32%] flex-shrink-0">
                      <audio controls className="w-full">
                        <source src={`/audio${index + 1}.mp3`} type="audio/mpeg" />
                      </audio>
                    </div>
                  ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold">Course Materials</h2>
              <div className="flex space-x-6">
                {pdfFiles.map((file, index) => (
                  <a
                    key={index}
                    href={file.path}
                    download
                    className="p-2 rounded-lg shadow hover:shadow-lg transition duration-200"
                    title={`Download ${file.name}`}
                  >
                    <img src={file.icon} alt={file.name} className="w-10 h-10" />
                    <p className="text-xs text-center mt-1">{file.name}</p>
                  </a>
                ))}
              </div>
            </div>
            <Tabs defaultValue="theory" className="mb-8">
              <TabsList>
                <TabsTrigger value="theory">Theory</TabsTrigger>
                <TabsTrigger value="images">Images</TabsTrigger>
              </TabsList>
              <TabsContent value="theory">
                <Card>
                  <CardContent className="p-6 prose max-w-none">
                    <h1 className="mb-4 text-2xl font-medium">Introduction to React Components</h1>
                    <p>
                      React components are the building blocks of React applications. They are reusable pieces of code
                      that return React elements to be rendered to the page.
                    </p>
                    <h4>Types of Components</h4>
                    <ul>
                      <li>Functional Components</li>
                      <li>Class Components</li>
                    </ul>
                    <p>
                      <b>
                        In modern React development, functional components with hooks are preferred due to their
                        simplicity
                      </b>
                      and ease of use. Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, aspernatur!
                      Omnis delectus mollitia repellat laudantium corporis facilis adipisci non hic et eius ipsum,
                      aperiam explicabo fugiat corrupti unde? Consequatur perferendis nisi fuga ea modi, earum
                      cupiditate vero pariatur quas soluta similique autem consectetur! Rem tempore officiis, modi sit
                      recusandae impedit.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="images">
                <Card>
                  <CardContent className="p-6">
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                      <img src="https://miro.medium.com/v2/resize:fit:1400/1*LhEgzn_fJ2KmBc8Ld7mEfA.png" alt="" />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute transform -translate-y-1/2 left-2 top-1/2"
                        onClick={handleImagenext}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute transform -translate-y-1/2 right-2 top-1/2"
                        onClick={handleImagenext}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
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
          </div>
        </div>
      </div>
    </DashboardPage>
  );
};

export default Content;
