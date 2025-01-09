import { Button } from "@/components/ui/button";
import DashboardPage from "@/layouts/DashboardPage";
import { Link } from "react-router-dom";

interface CardData {
  title: string;
  description: string;
  color: string;
}

const Course = () => {
  const displayCardData: CardData[] = JSON.parse(localStorage.getItem("courses") || "[]") || [];

  return (
    <DashboardPage>
      <div className="flex justify-between">
        <p className="md:text-xl text-normal font-medium mt-2">Course List</p>
        <Link to="/add-course">
          <Button variant="default" size="lg" className="mb-5 hidden md:block">
            Add Course
          </Button>
          <Button variant="default" size="sm" className="mb-5 md:hidden">
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

  return (
    <div
      className="w-full p-3 mx-auto mb-3 text-white rounded-md min-h-52 md:mb-6"
      style={{ backgroundColor: displayCardData.color }}
    >
      <h2 className="mb-3 md:text-xl text-normal font-bold">{displayCardData.title}</h2>
      <p className="md:text-sm text-xs">{displayCardData.description}</p>
    </div>
  );
};
