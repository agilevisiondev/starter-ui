import { ContentSidebar } from "@/pages/course/content/content-sidebar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DashboardPage from "@/layouts/DashboardPage";
import { useEffect, useRef, useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import clsx from "clsx";

interface Video {
  data: string;
}

interface Audio {
  data: string;
}

interface Image {
  data: string;
}

interface Text {
  data: string;
}

interface ParsedContent {
  videos: Video[];
  audios: Audio[];
  images: Image[];
  texts: Text[];
  pdfs: { name: string; data: string }[];
}

interface SubChapter {
  subChapterName: string;
}

interface CardData {
  id: number;
  chapterName: string;
  description: string;
  subChapter: SubChapter[];
}

const Content = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [chapters, setChapters] = useState<CardData[]>([
    {
      id: 1,
      chapterName: "",
      description: "",
      subChapter: [],
    },
  ]);

  const [selectedContent, setSelectedContent] = useState<ParsedContent | null>(null);
  const [videos, setVideos] = useState<string[]>([]);
  const [pdfFiles, setPdfFiles] = useState<{ name: string; data: string }[]>([]);
  const [audioFiles, setAudioFiles] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<string[]>([]);
  const [text, setText] = useState<string>("");

  const handleContentChange = (key: string): void => {
    const content = localStorage.getItem(key);
    if (content) {
      const parsedContent: ParsedContent = JSON.parse(content);
      setSelectedContent(parsedContent);
      if (parsedContent) {
        const videoUrls = parsedContent.videos.map((item) => item.data);
        setVideos(videoUrls);
        setPdfFiles(parsedContent.pdfs);
        setAudioFiles(parsedContent.audios.map((item) => item.data));
        setImageFiles(parsedContent.images.map((item) => item.data));
        setText(parsedContent.texts[0]?.data || "");
      }
    }
  };

  const isTabView = useIsMobile();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const selectedChapterId = localStorage.getItem("selectedChapterId");
    const chapterData = JSON.parse(localStorage.getItem("chapter") || "[]");
    if (selectedChapterId && chapterData.length > 0) {
      const selectedChapter = chapterData.find(
        (chapter: { id: number }) => chapter.id.toString() === selectedChapterId,
      );
      if (selectedChapter) {
        setChapters([selectedChapter]);
        if (selectedChapter.subChapter && selectedChapter.subChapter.length > 0) {
          const firstSubChapterName = selectedChapter.subChapter[0].subChapterName;
          handleContentChange(firstSubChapterName);
        }
      }
    }
  }, []);

  const handleVideoNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
  };
  const handleVideoPrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
  };

  const handleImageNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageFiles.length);
  };
  const handleImagePrev = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? imageFiles.length - 1 : prevIndex - 1));
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
    if (isTabView) {
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
              isTabView && showSidebar,
            "absolute z-20 h-screen top-0 -left-96 bg-gray-50 transition-transform ease-in-out duration-300 transform -translate-x-full":
              isTabView && !showSidebar,
            "h-[calc(100vh-100px)] sticky top-0": !isTabView,
          })}
        >
          <ContentSidebar
            className={`${!isTabView ? "w-56" : "w-64"}`}
            displayCardData={chapters}
            onContentChange={handleContentChange}
          />
        </div>
        <div>
          <header className="sticky right-0 z-10 items-center gap-2 py-2 px-6 border-b top-0 bg-background shrink-0">
            <h1 className="text-3xl font-medium">{chapters[0].chapterName ?? ""}</h1>
            {isTabView && (
              <span onClick={handleToggle} className="my-2 inline-flex text-sm text-blue-800 rounded-lg items-center">
                <ChevronLeft className="size-4" />
                view chapters
              </span>
            )}
          </header>
          <div className="p-5 space-y-10">
            <div>
              <p className="mb-4 text-2xl font-medium">Video Lesson</p>
              <div className="relative overflow-hidden bg-black rounded-lg aspect-video">
                <video controls width="100%" height="100%" src={videos[currentVideoIndex]} title="Course Video"></video>

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
                {audioFiles.map((audio, index) => (
                  <div key={index} className="min-w-[32%] flex-shrink-0">
                    <audio controls className="w-full">
                      <source src={audio} type="audio/mpeg" />
                    </audio>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="mb-4 text-xl font-semibold">Course Materials</h2>
              <div className="flex overflow-x-auto gap-x-4 p-1">
                {pdfFiles.map((file, index) => (
                  <a
                    key={index}
                    href={file.data}
                    download
                    className="flex flex-col p-2 min-w-[30%] md:min-w-[10%] rounded-lg shadow hover:shadow-lg transition duration-200 justify-center items-center"
                    title={`Download ${file.name}`}
                  >
                    <img src="/pdf.png" alt={file.name} className="w-10 h-10" />
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
                  <CardContent className="p-6 prose max-w-none">{text}</CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="images">
                <Card>
                  <CardContent className="p-6">
                    <div className="relative overflow-hidden rounded-lg aspect-video">
                      <img src={imageFiles[currentImageIndex]} alt="" />
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute transform -translate-y-1/2 left-2 top-1/2"
                        onClick={handleImagePrev}
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="absolute transform -translate-y-1/2 right-2 top-1/2"
                        onClick={handleImageNext}
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
