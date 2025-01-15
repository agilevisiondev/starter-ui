export interface Exam {
  id: string;
  name: string;
  userClass: string;
  date: Date | null;
  duration: string;
  attempts: number;
  questions: any[] | Question[];
}

export interface Question {
  id: number;
  question: string;
  difficulty: string;
  type: string;
  correctAnswer?: string;
  options?: string[];
}
