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
      <div className="flex justify-between p-5">
        <p className="text-xl font-medium mt-2">Course List</p>
        <Link to="/add-course">
          <Button variant="default" size="lg">
            Add Course
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1  gap-5">
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
      className="w-full p-3 mx-auto mb-3 text-white rounded-md min-h-64 md:mb-6 md:px-5"
      style={{ backgroundColor: displayCardData.color }}
    >
      <h2 className="mb-3 text-xl font-semibold">{displayCardData.title}</h2>
      <p className="text-sm">{displayCardData.description}</p>
    </div>
  );
};
