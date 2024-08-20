import { useState } from 'react';
import AnamnesisFormList from './components/Anamnesis/Form/AnamnesisFormList';
import AnamnesisFormDetail from './components/Anamnesis/FormDetail/AnamnesisFormDetail';
import CreateAnamnesisForm from './components/Anamnesis/CreateForm/CreateAnamnesisForm';
import UpdateAnamnesisForm from './components/Anamnesis/UpdateForm/UpdateAnamnesisForm';
import mockForms from './mockDatas/forms';
export default function App() {

  const [forms, setForms] = useState(mockForms);
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

  return (
    <main>
      {currentPage == 0 && <AnamnesisFormList forms={forms} setForms={setForms} handleIdChange={handleIdChange} handleNextPage={goToNextPage} ></AnamnesisFormList>}
      {currentPage == 1 && <CreateAnamnesisForm forms={forms} setForms={setForms} handleNextPage={goToNextPage} handlePreviousPage={goToPreviousPage}></CreateAnamnesisForm>}
      {idForm && currentPage == 2 && <UpdateAnamnesisForm id={idForm} forms={forms} setForms={setForms} handlePreviousPage={goToPreviousPage}></UpdateAnamnesisForm>}
      {idForm && currentPage == 3 && <AnamnesisFormDetail id={idForm} forms={forms} setForms={setForms} handlePreviousPage={goToPreviousPage}></AnamnesisFormDetail>}

    </main>
  );
}