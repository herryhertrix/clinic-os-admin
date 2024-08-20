import { Question } from "./QuestionModel";

export interface Section {
  id: number;
  title: string;
  questions: Question[];
}
