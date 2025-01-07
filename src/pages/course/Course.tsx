import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Course = () => {
  return (

      <div className="flex justify-end p-5">
        <Button variant="default" size="lg">
          <Link to="addCourse">Add Course</Link>
        </Button>
      </div>
     
  );
};

export default Course;
