import { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor, KeyboardSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import Draggable from '../../Utils/Draggable';

const CreateAnamnesisForm = ({ forms, setForms, handlePreviousPage, handleNextPage }: any) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [sections, setSections] = useState([{ id: 1, title: '', questions: [{ id: 1, text: '', type: 'Short Text' }] }]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      }
    }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = ({ active, over }: any) => {
    if (!over || active.id === over.id) return;

    setSections((items) => {
      const oldIndex = items.findIndex(item => item.id === active.id);
      const newIndex = items.findIndex(item => item.id === over.id);
      return arrayMove(items, oldIndex, newIndex);
    });
  };

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1, title: '', questions: [] }]);
  };

  const addQuestion = (sectionId: any) => {
    const updatedSections = sections.map((section) => {
      if (section.id === sectionId) {
        section.questions.push({ id: section.questions.length + 1, type: 'Short text', text: '' });
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    const newForm = {
      id: forms.length + 1,
      title,
      description,
      createdAt: new Date().toISOString().split('T')[0],
      sections,
    };
    setForms([...forms, newForm]);
    handleNextPage(0);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Anamnesis Form</h1>
      <button className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4" onClick={handlePreviousPage}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg> Back
      </button>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map((section, sectionIndex) => (
            <Draggable key={section.id} id={section.id}>
              <div className="border p-2 mb-2">
                <input
                  type="text"
                  placeholder="Section Title"
                  value={section.title}
                  onChange={(e) => {
                    const updatedSections = [...sections];
                    updatedSections[sectionIndex].title = e.target.value;
                    setSections(updatedSections);
                  }}
                  className="p-2 border rounded mb-2 w-full"
                />
                <SortableContext items={section.questions} strategy={verticalListSortingStrategy}>
                  {section.questions.map((question, questionIndex) => (
                    <Draggable key={question.id} id={question.id}>
                      <div className="ml-4 p-2">
                        <input
                          type="text"
                          placeholder="Question Text"
                          value={question.text}
                          onChange={(e: any) => {
                            const updatedSections = [...sections];
                            updatedSections[sectionIndex].questions[questionIndex].text = e.target.value;
                            setSections(updatedSections);
                          }}
                          className="p-2 border rounded mb-2 w-full"
                        />
                        <select
                          value={question.type}
                          onChange={(e) => {
                            const updatedSections = [...sections];
                            updatedSections[sectionIndex].questions[questionIndex].type = e.target.value;
                            setSections(updatedSections);
                          }}
                          className="p-2 border rounded mb-2"
                        >
                          <option value="Short text">Short text</option>
                          <option value="Long text">Long text</option>
                          <option value="Multiple choice">Multiple choice</option>
                          <option value="Date time">Date time</option>
                        </select>
                      </div>
                    </Draggable>
                  ))}
                </SortableContext>
                <button onClick={() => addQuestion(section.id)} className="text-blue-500">
                  Add Question
                </button>
              </div>
            </Draggable>
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={addSection} className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4">Add Section</button>
      <button onClick={handleSubmit} className="bg-green-500 text-white rounded-lg px-3 py-1 flex items-center mb-4">Create Form</button>
    </div>
  );
};

export default CreateAnamnesisForm;
