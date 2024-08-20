import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CreateAnamnesisForm from './CreateAnamnesisForm';

describe('CreateAnamnesisForm', () => {
  let mockForms: any[] = [];
  const mockSetForms = jest.fn();
  const mockHandlePreviousPage = jest.fn();
  const mockHandleNextPage = jest.fn();

  beforeEach(() => {
    render(
      <CreateAnamnesisForm
        forms={mockForms}
        setForms={mockSetForms}
        handlePreviousPage={mockHandlePreviousPage}
        handleNextPage={mockHandleNextPage}
      />
    );
  });

  it('renders the form and allows adding a section', () => {
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Anamnesis Form' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'This is a description' },
    });

    fireEvent.click(screen.getByText('Add Section'));
    expect(screen.getByPlaceholderText('Section Title')).toBeInTheDocument();
  });

  it('allows adding a question to a section', () => {
    fireEvent.click(screen.getByText('Add Section'));
    fireEvent.change(screen.getByPlaceholderText('Section Title'), {
      target: { value: 'General Questions' },
    });

    fireEvent.click(screen.getByText('Add Question'));
    expect(screen.getByPlaceholderText('Question Text')).toBeInTheDocument();
  });

  it('allows removing a section', () => {
    fireEvent.click(screen.getByText('Add Section'));
    expect(screen.getByPlaceholderText('Section Title')).toBeInTheDocument();

    fireEvent.click(screen.getByPlaceholderText('Remove Section'));
    expect(screen.queryByPlaceholderText('Section Title')).not.toBeInTheDocument();
  });

  it('allows removing a question', () => {
    fireEvent.click(screen.getByText('Add Section'));
    fireEvent.click(screen.getByText('Add Question'));
    expect(screen.getByPlaceholderText('Question Text')).toBeInTheDocument();

    fireEvent.click(screen.getByPlaceholderText('Remove Question'));
    expect(screen.queryByPlaceholderText('Question Text')).not.toBeInTheDocument();
  });

  it('submits the form', () => {
    fireEvent.change(screen.getByPlaceholderText('Title'), {
      target: { value: 'New Anamnesis Form' },
    });
    fireEvent.change(screen.getByPlaceholderText('Description'), {
      target: { value: 'This is a description' },
    });

    fireEvent.click(screen.getByText('Add Section'));
    fireEvent.change(screen.getByPlaceholderText('Section Title'), {
      target: { value: 'General Questions' },
    });

    fireEvent.click(screen.getByText('Create Form'));

    expect(mockSetForms).toHaveBeenCalled();
    expect(mockHandleNextPage).toHaveBeenCalledWith(0);
  });
});

// npx jest src/components/Anamnesis/CreateForm/CreateAnamnesisForm.spec.tsx
