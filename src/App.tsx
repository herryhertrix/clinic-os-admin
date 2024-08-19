import { useState } from 'react';
import AnamnesisFormList from './components/Anamnesis/Form/AnamnesisFormList';
import AnamnesisFormDetail from './components/Anamnesis/FormDetail/AnamnesisFormDetail';
import CreateAnamnesisForm from './components/Anamnesis/CreateForm/CreateAnamnesisForm';
import UpdateAnamnesisForm from './components/Anamnesis/UpdateForm/UpdateAnamnesisForm';
export default function App() {

  const [forms, setForms] = useState([
    {
      id: 1,
      title: 'General Health',
      description: 'General health questions',
      createdAt: '2023-01-01',
      sections: [
        {
          id: 1,
          title: 'Section 1',
          questions: [
            { id: 1, type: 'Short text', text: 'What is your name?' },
            { id: 2, type: 'Date time', text: 'When is your birthday?' },
          ],
        },
      ],
    }
    // Add more items here
  ]);
  const [idForm, setIdForm] = useState();

  const handleIdChange = (data: any) => {
    setIdForm(data)
  };

  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const goToNextPage = (targetPage: number) => {
    setLastPage(currentPage); // Remember the current page
    setCurrentPage(targetPage);
  };

  const goToPreviousPage = () => {
    setCurrentPage(lastPage); // Go back to the last page
    setLastPage(0);
  };

  const deleteForm = (id: number) => {
    forms.filter(form => form.id !== id);
  }

  return (
    <main>
      <h1 className="text-3xl font-bold text-center my-4">Anamnesis Forms</h1>
      {currentPage == 0 && <AnamnesisFormList forms={forms} handleIdChange={handleIdChange} handleNextPage={goToNextPage} handleDelete={deleteForm} ></AnamnesisFormList>}
      {currentPage == 1 && <CreateAnamnesisForm forms={forms} setForms={setForms} handleNextPage={goToNextPage} handlePreviousPage={goToPreviousPage}></CreateAnamnesisForm>}
      {idForm && currentPage == 2 && <UpdateAnamnesisForm id={idForm} forms={forms} setForms={setForms} handlePreviousPage={goToPreviousPage}></UpdateAnamnesisForm>}
      {idForm && currentPage == 3 && <AnamnesisFormDetail id={idForm} forms={forms} setForms={setForms} handlePreviousPage={goToPreviousPage}></AnamnesisFormDetail>}

    </main>
  );
}