import { render, fireEvent } from '@testing-library/react';
import AnamnesisFormDetail from './AnamnesisFormDetail';
import { DndContext } from '@dnd-kit/core';
import mockForms from '../../../mockDatas/forms';

describe('AnamnesisFormDetail', () => {
  const forms = mockForms;

  const setup = () => {
    const handlePreviousPage = jest.fn();
    const setForms = jest.fn();
    const utils = render(
      <DndContext>
        <AnamnesisFormDetail
          id="1"
          forms={forms}
          setForms={setForms}
          handlePreviousPage={handlePreviousPage}
        />
      </DndContext>
    );

    return {
      ...utils,
      handlePreviousPage,
      setForms,
    };
  };

  it('renders the form details correctly', () => {
    const { getByText } = setup();
    expect(getByText('General Health')).toBeInTheDocument();
    expect(getByText('General health questions')).toBeInTheDocument();
    expect(getByText('Section 1')).toBeInTheDocument();
  });

  it('calls handlePreviousPage when "Back" button is clicked', () => {
    const { getByText, handlePreviousPage } = setup();
    const backButton = getByText('Back');
    fireEvent.click(backButton);
    expect(handlePreviousPage).toHaveBeenCalled();
  });

  // Note: Testing drag and drop requires more complex interaction testing which might be done through Playwright.
});

// npx jest src/components/Anamnesis/FormDetail/AnamnesisFormDetail.spec.tsx