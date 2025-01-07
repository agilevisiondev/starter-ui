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
      <p className="text-xl font-medium mb-5">Courses:</p>
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
      className="mx-auto w-full max-h-max md:mb-6 mb-3 md:px-5 p-3 rounded-md text-white"
      style={{ backgroundColor: displayCardData.color }}
    >
      <h2 className="md:text-2xl text-lg font-semibold mb-3">
        {displayCardData.title}
      </h2>
      <p className="text-sm md:text-normal">{displayCardData.description}</p>
    </div>
  );
};
