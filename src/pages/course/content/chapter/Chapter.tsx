import { Button } from "@/components/ui/button";
import DashboardPage from "@/layouts/DashboardPage";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface subChapter {
  subChapterName: string;
}
interface CardData {
  id: number;
  chapterName: string;
  description: string;
  color: string;
  subChapter: subChapter[];
  class: { label: string; value: string }[];
}

const Chapter = () => {
  const displayCardData: CardData[] = JSON.parse(localStorage.getItem("chapter") || "[]");
  return (
    <DashboardPage>
      <div className="flex justify-between">
        <p className="md:text-xl text-normal font-medium mt-2">Chapter List</p>
        <Link to="/add-chapter">
          <Button variant="default" size="sm" className="mb-5 md:px-8 md:h-11">
            Add Chapter
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
        {displayCardData.map((card: CardData, index: number) => {
          if (!card) {
            return <div key={index}>Invalid </div>;
          }
          return <Card key={index} displayCardData={card} />;
        })}
      </div>
    </DashboardPage>
  );
};

export default Chapter;
const Card = ({ displayCardData }: { displayCardData: CardData }) => {
  if (!displayCardData) {
    return <div>Invalid card data</div>;
  }
  const navigate = useNavigate();
  const hadleAddContent = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    localStorage.setItem("selectedChapterId", displayCardData.id.toString());
    navigate("/uploadContent");
  };
  const handleOpenContent = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLButtonElement) {
      return;
    }
    localStorage.setItem("selectedChapterId", displayCardData.id.toString());
    navigate("/content");
  };
  return (
    <div
      className="w-full h-52 p-3 mx-auto mb-3 rounded-md min-h-52 md:mb-6 border border-black overflow-hidden relative hover:shadow-lg"
      onClick={handleOpenContent}
    >
      <div className="flex justify-end">
        {Array.isArray(displayCardData.class) &&
          displayCardData.class.map((classItem, index) => (
            <Badge key={index} variant="default" className="ml-0.5">
              {classItem.label}
            </Badge>
          ))}
      </div>
      <h2 className="mb-3 md:text-xl text-normal font-bold">{displayCardData.chapterName}</h2>
      <Badge className="absolute top-4 right-2">{displayCardData.subChapter.length} section</Badge>
      <p className="md:text-sm text-xs">{displayCardData.description}</p>
      <Button
        onClick={hadleAddContent}
        className="absolute bottom-4 right-2 transition-transform duration-200 hover:scale-105 h-7 rounded-md px-1"
      >
        Add content
      </Button>
    </div>
  );
};
