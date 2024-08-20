import { QuestionTypeEnum } from "@/enums/QuestionTypeEnum";

export interface Question {
  id: number;
  type: QuestionTypeEnum;
  text: string;
}
