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
      <div className="flex justify-between items-start mb-4">
        <p className="text-2xl font-semibold">Courses List</p>
        <Link to="/add-course">
          <Button>Add Course</Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
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
      className="w-full lg:max-w-xs p-3 mb-3 text-white rounded-md min-h-64"
      style={{ backgroundColor: displayCardData.color }}
    >
      <h2 className="mb-3 text-xl font-semibold">{displayCardData.title}</h2>
      <p className="text-sm">{displayCardData.description}</p>
    </div>
  );
};
