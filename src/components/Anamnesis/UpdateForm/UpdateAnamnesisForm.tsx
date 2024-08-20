import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useState } from "react";

import { QuestionTypeEnum } from "@/enums/QuestionTypeEnum";
import { AnamnesisForm } from "@/models/AnamnesisFormModel";
import { Section } from "@/models/SectionModel";

import Draggable from "../../utils/Draggable";

interface UpdateAnamnesisFormProps {
  id: number;
  forms: AnamnesisForm[];
  setForms: (forms: AnamnesisForm[]) => void;
  handlePreviousPage: () => void;
}

const UpdateAnamnesisForm: React.FC<UpdateAnamnesisFormProps> = ({
  id,
  forms,
  setForms,
  handlePreviousPage,
}) => {
  const form = forms.find(f => f.id === id);

  if (!form) {
    return <div>Form not found</div>;
  }

  const [title, setTitle] = useState<string>(form.title);
  const [description, setDescription] = useState<string>(form.description);
  const [sections, setSections] = useState<Section[]>(form.sections);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const handleDragSectionEnd = ({ active, over }: any) => {
    if (!over || active.id === over.id) return;

    setSections((items: Section[]) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const handleDragQuestionEnd = (sectionId: number, { active, over }: any) => {
    if (!over || active.id === over.id) return;

    setSections((items: Section[]) => {
      return items.map(section => {
        if (section.id === sectionId) {
          const oldIndex = section.questions.findIndex(
            question => question.id === active.id
          );
          const newIndex = section.questions.findIndex(
            question => question.id === over.id
          );
          return {
            ...section,
            questions: arrayMove(section.questions, oldIndex, newIndex),
          };
        }
        return section;
      });
    });
  };

  const addSection = () => {
    setSections([
      ...sections,
      { id: sections.length + 1, title: "", questions: [] },
    ]);
  };

  const removeSection = (sectionId: number) => {
    setSections(sections.filter(section => section.id !== sectionId));
  };

  const addQuestion = (sectionId: number) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        section.questions.push({
          id: section.questions.length + 1,
          type: QuestionTypeEnum.ShortText,
          text: "",
        });
      }
      return section;
    });
    setSections(updatedSections);
  };

  const removeQuestion = (sectionId: number, questionId: number) => {
    const updatedSections = sections.map(section => {
      if (section.id === sectionId) {
        section.questions = section.questions.filter(
          question => question.id !== questionId
        );
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    const updatedForm: AnamnesisForm = {
      id: form.id,
      title,
      description,
      createdAt: form.createdAt,
      sections,
    };
    setForms(forms.map(f => (f.id === form.id ? updatedForm : f)));
    handlePreviousPage();
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center my-4">
        Update Anamnesis Form
      </h1>
      <button
        className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4"
        onClick={handlePreviousPage}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="h-5 w-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
          />
        </svg>{" "}
        Back
      </button>
      <input
        type="text"
        placeholder="Title"
        value={title}
        className="p-2 border rounded mb-4 w-full"
        onChange={(e: any) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        className="p-2 border rounded mb-4 w-full"
        onChange={(e: any) => setDescription(e.target.value)}
      />
      <DndContext sensors={sensors} onDragEnd={handleDragSectionEnd}>
        <SortableContext
          items={sections}
          strategy={verticalListSortingStrategy}
        >
          {sections.map((section, sectionIndex) => (
            <Draggable key={section.id} id={section.id}>
              <div className="border p-2 mb-2">
                <div className="flex justify-between items-center mb-2">
                  <button
                    className="text-red-500 ml-2"
                    placeholder="Remove Section"
                    onClick={() => removeSection(section.id)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5 mr-1"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <input
                    type="text"
                    placeholder="Section Title"
                    value={section.title}
                    className="p-2 border rounded w-full"
                    onChange={(e: any) => {
                      const updatedSections = [...sections];
                      updatedSections[sectionIndex].title = e.target.value;
                      setSections(updatedSections);
                    }}
                  />
                </div>
                <DndContext
                  sensors={sensors}
                  onDragEnd={(event: any) =>
                    handleDragQuestionEnd(section.id, event)
                  }
                >
                  <SortableContext
                    items={section.questions}
                    strategy={verticalListSortingStrategy}
                  >
                    {section.questions.map((question, questionIndex) => (
                      <Draggable key={question.id} id={question.id}>
                        <div className="ml-4 p-2 border rounded mb-2">
                          <div className="flex justify-between items-center">
                            <input
                              type="text"
                              placeholder="Question Text"
                              value={question.text}
                              className="p-2 border rounded mb-2 w-full"
                              onChange={(e: any) => {
                                const updatedSections = [...sections];
                                updatedSections[sectionIndex].questions[
                                  questionIndex
                                ].text = e.target.value;
                                setSections(updatedSections);
                              }}
                            />
                            <button
                              className="text-red-500 ml-2"
                              placeholder="Remove Question"
                              onClick={() =>
                                removeQuestion(section.id, question.id)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-5 w-5 mr-1"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                />
                              </svg>
                            </button>
                          </div>
                          <select
                            value={question.type}
                            className="p-2 border rounded mb-2 w-full"
                            onChange={(e: any) => {
                              const updatedSections = [...sections];
                              updatedSections[sectionIndex].questions[
                                questionIndex
                              ].type = e.target.value as QuestionTypeEnum;
                              setSections(updatedSections);
                            }}
                          >
                            <option value={QuestionTypeEnum.ShortText}>
                              Short text
                            </option>
                            <option value={QuestionTypeEnum.LongText}>
                              Long text
                            </option>
                            <option value={QuestionTypeEnum.MultipleChoice}>
                              Multiple choice
                            </option>
                            <option value={QuestionTypeEnum.DateTime}>
                              Date time
                            </option>
                          </select>
                        </div>
                      </Draggable>
                    ))}
                  </SortableContext>
                </DndContext>
                <button
                  className="text-blue-500"
                  onClick={() => addQuestion(section.id)}
                >
                  Add Question
                </button>
              </div>
            </Draggable>
          ))}
        </SortableContext>
      </DndContext>
      <button
        className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4"
        onClick={addSection}
      >
        Add Section
      </button>
      <button
        className="bg-green-500 text-white rounded-lg px-3 py-1 flex items-center mb-4"
        onClick={handleSubmit}
      >
        Update Form
      </button>
    </div>
  );
};

export default UpdateAnamnesisForm;
