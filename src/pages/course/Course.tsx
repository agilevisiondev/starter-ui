import { Button } from "@/components/ui/button";
import DashboardPage from "@/layouts/DashboardPage";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
interface CardData {
  id: number;
  title: string;
  description: string;
  color: string;
  class: { label: string; value: string }[];
}

const Course = () => {
  const displayCardData: CardData[] = JSON.parse(localStorage.getItem("courses") || "[]");

  return (
    <DashboardPage>
      <div className="flex justify-between">
        <p className="md:text-xl text-normal font-medium mt-2">Course List</p>
        <Link to="/add-course">
          <Button variant="default" size="sm" className="mb-5 md:px-8 md:h-11">
            Add Course
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-5">
        {displayCardData.map((card: CardData, index: number) => {
          if (!card || !card.title || !card.description || !card.color) {
            return <div key={index}>Invalid card data</div>;
          }
          return <Card key={index} displayCardData={card} />;
        })}
      </div>
    </DashboardPage>
  );
};

export default Course;
const Card = ({ displayCardData }: { displayCardData: CardData }) => {
  if (!displayCardData || !displayCardData.color) {
    return <div>Invalid card data</div>;
  }

  const navigate = useNavigate();
  const handleEditClick = () => {
    navigate("/add-course", { state: {cardData:displayCardData} });
  };

  return (
    <div
      className="w-full p-3 mx-auto mb-3 text-white rounded-md min-h-52 md:mb-6"
      style={{ backgroundColor: displayCardData.color }}
    >
      <div className="flex justify-end">
        {Array.isArray(displayCardData.class) &&
          displayCardData.class.map((classItem, index) => (
            <Badge key={index} variant="default" className="ml-0.5">
              {classItem.label}
            </Badge>
          ))}
        {/* <Link to="/add-course"></Link> */}
        <SquarePen className="size-5 ml-2 cursor-pointer hover:scale-110 duration-300" onClick={handleEditClick} />
      </div>
      <h2 className="mb-3 md:text-xl text-normal font-bold">{displayCardData.title}</h2>
      <p className="md:text-sm text-xs">{displayCardData.description}</p>
    </div>
  );
};
