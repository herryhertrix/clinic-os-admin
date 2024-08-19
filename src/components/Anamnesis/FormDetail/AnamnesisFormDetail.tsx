import { useState } from 'react';
import { DndContext, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';


const AnamnesisFormDetail = ({ id, forms, setForms, handlePreviousPage }: any) => {
  const form = forms.find((f: any) => f.id === parseInt(id));
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
      setForms(forms.map((f: any) =>
        f.id === form.id ? { ...f, sections } : f
      ));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{form.title}</h1>
      <p className="mb-4">{form.description}</p>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <SortableContext items={sections} strategy={verticalListSortingStrategy}>
          {sections.map((section: any) => (
            <div key={section.id} className="border p-2 mb-2">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              {section.questions.map((question: any) => (
                <div key={question.id} className="ml-4 p-2">
                  <p>{question.type}: {question.text}</p>
                </div>
              ))}
            </div>
          ))}
        </SortableContext>
      </DndContext>
      <button className="bg-blue-500 text-white rounded-lg px-3 py-1 flex items-center mb-4" onClick={handlePreviousPage} >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 mr-1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg> Back
      </button>
    </div>
  );
};

export default AnamnesisFormDetail;