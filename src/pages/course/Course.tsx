import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

interface CardData {
  title: string;
  description: string;
  color: string;
}

const Course = () => {
  const displayCardData: CardData[] =
    JSON.parse(localStorage.getItem("courses") || "[]") || [];

  return (
    <div>
      <div className="flex justify-end p-5">
        <Link to="/courses/addCourse">
          <Button variant="default" size="lg">
            Add Course
          </Button>
        </Link>
      </div>
      <p className="mb-5 text-xl font-medium">Courses:</p>
      <div className="grid grid-cols-3 gap-5">
        {displayCardData.map((card: CardData, index: number) => {
          if (!card || !card.title || !card.description || !card.color) {
            return <div key={index}>Invalid card data</div>;
          }
          return <Card key={index} displayCardData={card} />;
        })}
      </div>
    </div>
  );
};

export default Course;
const Card = ({ displayCardData }: { displayCardData: CardData }) => {
  if (!displayCardData || !displayCardData.color) {
    return <div>Invalid card data</div>;
  }

  return (
    <div
      className="w-full p-3 mx-auto mb-3 text-white rounded-md max-h-max md:mb-6 md:px-5"
      style={{ backgroundColor: displayCardData.color }}
    >
      <h2 className="mb-3 text-lg font-semibold md:text-2xl">
        {displayCardData.title}
      </h2>
      <p className="text-sm md:text-normal">{displayCardData.description}</p>
    </div>
  );
};
