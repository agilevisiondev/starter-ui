import { useEffect, useState } from "react";

interface Exam {
  id: string;
  name: string;
  userClass: string;
  date: Date;
  duration: string;
  attempts: number;
  questions: number[];
}

function Preview() {
  const [examdata, setExamData] = useState<Exam | null>(null);
  useEffect(() => {
    const previewExamData = localStorage.getItem("exams");
    if (previewExamData) {
      const parsedPreviewExamData = JSON.parse(previewExamData);
      setExamData(parsedPreviewExamData);
    }
  }, []);
  console.log(examdata, "Hello ");
  return (
    <div>
      <div>
        Exam Instruction:
        <p> Exam Date</p>
      </div>
    </div>
  );
}

export default Preview;
