import { render, screen, fireEvent } from '@testing-library/react';
import AnamnesisFormList from './AnamnesisFormList';
import mockForms from '../../../mockDatas/forms';

const forms = mockForms.slice(0, 2); // Mock data for testing

describe('AnamnesisFormList', () => {
  const handleIdChange = jest.fn();
  const handleNextPage = jest.fn();

  beforeEach(() => {
    render(
      <AnamnesisFormList
        forms={forms}
        setForms={jest.fn()} // Mock setForms as it will be managed internally
        handleIdChange={handleIdChange}
        handleNextPage={handleNextPage}
      />
    );
  });

  it('renders form list correctly', () => {
    expect(screen.getByText('General Health')).toBeInTheDocument();
    expect(screen.getByText('Medical History')).toBeInTheDocument();
  });

  it('filters the forms based on search input', () => {
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'General Health' } });

    expect(screen.queryByText('Family History')).not.toBeInTheDocument();
    expect(screen.getByText('General Health')).toBeInTheDocument();
  });

  it('sorts the forms by description when the description header is clicked', () => {
    const descriptionHeader = screen.getByText('Description');
    fireEvent.click(descriptionHeader);

    const firstRow = screen.getAllByRole('row')[1];
    expect(firstRow).toHaveTextContent('General HealthGeneral health questions1/1/2023 ViewEdit Delete');

    fireEvent.click(descriptionHeader);

    const firstRowDesc = screen.getAllByRole('row')[1];
    expect(firstRowDesc).toHaveTextContent('Medical HistoryQuestions about your past medical history2/15/2023 ViewEdit Delete');
  });

  it('disables the Next button if there are not enough forms to paginate', () => {
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('calls handleIdChange and handleNextPage when view button is clicked', () => {
    const viewButton = screen.getAllByText('View')[0];
    fireEvent.click(viewButton);

    expect(handleIdChange).toHaveBeenCalledWith(1); // Assuming the first form has id 1
    expect(handleNextPage).toHaveBeenCalledWith(3);
  });

  it('deletes a form and updates the form list correctly', () => {
    const deleteButton = screen.getAllByText('Delete')[0];
    fireEvent.click(deleteButton);

    expect(screen.queryByText('General Health')).not.toBeInTheDocument(); // Check if the form is deleted from the DOM
  });
});

// npx jest src/components/Anamnesis/Form/AnamnesisFormList.spec.tsx