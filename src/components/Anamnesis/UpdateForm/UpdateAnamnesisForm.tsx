import { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';

const UpdateAnamnesisForm = ({ id, forms, setForms, handlePreviousPage }: any) => {
  const form = forms.find((f: any) => f.id === parseInt(id));

  const [title, setTitle] = useState(form.title);
  const [description, setDescription] = useState(form.description);
  const [sections, setSections] = useState(form.sections);

  const sensors = useSensors(
    useSensor(PointerSensor)
  );

  const handleDragEnd = ({ active, over }: any) => {
    if (active.id !== over.id) {
      setSections((items: any) => {
        const oldIndex = items.findIndex((item: any) => item.id === active.id);
        const newIndex = items.findIndex((item: any) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const addSection = () => {
    setSections([...sections, { id: sections.length + 1, title: '', questions: [] }]);
  };

  const addQuestion = (sectionId: any) => {
    const updatedSections = sections.map((section: any) => {
      if (section.id === sectionId) {
        section.questions.push({ id: section.questions.length + 1, type: 'Short text', text: '' });
      }
      return section;
    });
    setSections(updatedSections);
  };

  const handleSubmit = () => {
    const updatedForm = {
      id: form.id,
      title,
      description,
      createdAt: form.creationDate,
      sections,
    };
    setForms(forms.map((f: any) => (f.id === form.id ? updatedForm : f)));
    handlePreviousPage()
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Update Anamnesis Form</h1>
      <button className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4" onClick={handlePreviousPage} >
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
          {sections.map((section: any, sectionIndex: any) => (
            <div key={section.id} className="border p-2 mb-2">
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
              {section.questions.map((question: any, questionIndex: any) => (
                <div key={question.id} className="ml-4 p-2">
                  <input
                    type="text"
                    placeholder="Question Text"
                    value={question.text}
                    onChange={(e) => {
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
              ))}
              <button onClick={() => addQuestion(section.id)} className="text-blue-500">
                Add Question
              </button>
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <button onClick={addSection} className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4">Add Section</button>
      <button onClick={handleSubmit} className="bg-green-500 text-white rounded-lg px-3 py-1 flex items-center mb-4">Update Form</button>
    </div>
  );
};

export default UpdateAnamnesisForm;