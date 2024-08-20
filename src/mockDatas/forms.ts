import { QuestionTypeEnum } from "@/enums/QuestionTypeEnum";
import { AnamnesisForm } from "@/models/AnamnesisFormModel";

const mockForms: AnamnesisForm[] = [
  {
    id: 1,
    title: "General Health",
    description: "General health questions",
    createdAt: "2023-01-01",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questions: [
          {
            id: 1,
            type: QuestionTypeEnum.ShortText,
            text: "What is your name?",
          },
          {
            id: 2,
            type: QuestionTypeEnum.DateTime,
            text: "When is your birthday?",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    title: "Medical History",
    description: "Questions about your past medical history",
    createdAt: "2023-02-15",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questions: [
          {
            id: 1,
            type: QuestionTypeEnum.ShortText,
            text: "Do you have any chronic illnesses?",
          },
          {
            id: 2,
            type: QuestionTypeEnum.LongText,
            text: "Please describe any surgeries you have had.",
          },
        ],
      },
      {
        id: 2,
        title: "Section 2",
        questions: [
          {
            id: 3,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Have you ever been hospitalized?",
          },
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Lifestyle",
    description: "Questions about your daily lifestyle",
    createdAt: "2023-03-10",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questions: [
          {
            id: 1,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Do you smoke?",
          },
          {
            id: 2,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Do you consume alcohol?",
          },
        ],
      },
      {
        id: 2,
        title: "Section 2",
        questions: [
          {
            id: 3,
            type: QuestionTypeEnum.ShortText,
            text: "How many hours do you sleep on average?",
          },
          {
            id: 4,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Do you exercise regularly?",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Nutrition",
    description: "Questions about your diet and nutrition",
    createdAt: "2023-04-05",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questions: [
          {
            id: 1,
            type: QuestionTypeEnum.ShortText,
            text: "How many meals do you eat per day?",
          },
          {
            id: 2,
            type: QuestionTypeEnum.ShortText,
            text: "Do you follow any specific diet?",
          },
        ],
      },
      {
        id: 2,
        title: "Section 2",
        questions: [
          {
            id: 3,
            type: QuestionTypeEnum.LongText,
            text: "Describe your typical daily diet.",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Mental Health",
    description: "Questions about your mental well-being",
    createdAt: "2023-05-20",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questions: [
          {
            id: 1,
            type: QuestionTypeEnum.ShortText,
            text: "How often do you feel stressed?",
          },
          {
            id: 2,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Have you ever been diagnosed with a mental health disorder?",
          },
        ],
      },
      {
        id: 2,
        title: "Section 2",
        questions: [
          {
            id: 3,
            type: QuestionTypeEnum.LongText,
            text: "Please describe any treatment or therapy you are currently receiving.",
          },
        ],
      },
    ],
  },
  {
    id: 6,
    title: "Family History",
    description: "Questions about your family's medical history",
    createdAt: "2023-06-01",
    sections: [
      {
        id: 1,
        title: "Section 1",
        questions: [
          {
            id: 1,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Does your family have a history of heart disease?",
          },
          {
            id: 2,
            type: QuestionTypeEnum.MultipleChoice,
            text: "Does your family have a history of diabetes?",
          },
        ],
      },
      {
        id: 2,
        title: "Section 2",
        questions: [
          {
            id: 3,
            type: QuestionTypeEnum.ShortText,
            text: "Please list any other known family medical conditions.",
          },
        ],
      },
    ],
  },
];

export default mockForms;
