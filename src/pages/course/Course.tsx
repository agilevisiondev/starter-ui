import { Button } from "@/components/ui/button";
import DashboardPage from "@/layouts/DashboardPage";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
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
        <p className="mt-2 font-medium md:text-xl text-normal">Course List</p>
        <Link to="/add-course">
          <Button variant="default" size="sm" className="mb-5 md:px-8 md:h-11">
            Add Course
          </Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
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
  return (
    <div
      className="w-full h-56 p-3 mx-auto mb-3 text-white rounded-md md:mb-6"
      style={{ backgroundColor: displayCardData.color }}
    >
      <div className="flex justify-end">
        {Array.isArray(displayCardData.class) &&
          displayCardData.class.map((classItem, index) => (
            <Badge key={index} variant="default" className="ml-0.5">
              {classItem.label}
            </Badge>
          ))}
      </div>
      <h2 className="mb-3 font-bold md:text-xl text-normal">{displayCardData.title}</h2>
      <p className="text-xs md:text-sm">{displayCardData.description}</p>
    </div>
  );
};
