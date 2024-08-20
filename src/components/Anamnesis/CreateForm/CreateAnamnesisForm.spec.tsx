import { fireEvent, render, screen } from "@testing-library/react";

import CreateAnamnesisForm from "./CreateAnamnesisForm";

describe("CreateAnamnesisForm", () => {
  const setup = () => {
    const forms: any = [];
    const setForms = jest.fn();
    const handlePreviousPage = jest.fn();
    const handleNextPage = jest.fn();

    render(
      <CreateAnamnesisForm
        forms={forms}
        setForms={setForms}
        handlePreviousPage={handlePreviousPage}
        handleNextPage={handleNextPage}
      />
    );

    return {
      forms,
      setForms,
      handlePreviousPage,
      handleNextPage,
    };
  };

  it("should render the title and description inputs", () => {
    setup();
    expect(screen.getByPlaceholderText("Title")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Description")).toBeInTheDocument();
  });

  it('should add a new section when the "Add Section" button is clicked', () => {
    setup();
    const addButton = screen.getByText("Add Section");
    fireEvent.click(addButton);
    expect(screen.getByPlaceholderText("Section Title")).toBeInTheDocument();
  });

  it('should add a new question when the "Add Question" button is clicked', () => {
    setup();
    const sectionButton = screen.getByText("Add Section");
    fireEvent.click(sectionButton);
    const questionButton = screen.getByText("Add Question");
    fireEvent.click(questionButton);
    expect(screen.getByPlaceholderText("Question Text")).toBeInTheDocument();
  });

  it('should call handleNextPage and setForms when "Create Form" button is clicked', () => {
    const { setForms, handleNextPage } = setup();
    const createButton = screen.getByText("Create Form");
    fireEvent.click(createButton);

    expect(setForms).toHaveBeenCalled();
    expect(handleNextPage).toHaveBeenCalledWith(0);
  });

  it("should update section title when input is changed", () => {
    setup();
    const sectionButton = screen.getByText("Add Section");
    fireEvent.click(sectionButton);
    const sectionTitleInput: any = screen.getByPlaceholderText("Section Title");
    fireEvent.change(sectionTitleInput, {
      target: { value: "New Section Title" },
    });

    expect(sectionTitleInput.value).toBe("New Section Title");
  });

  it("should update question text when input is changed", () => {
    setup();
    const sectionButton = screen.getByText("Add Section");
    fireEvent.click(sectionButton);
    const questionButton = screen.getByText("Add Question");
    fireEvent.click(questionButton);
    const questionTextInput: any = screen.getByPlaceholderText("Question Text");
    fireEvent.change(questionTextInput, {
      target: { value: "New Question Text" },
    });

    expect(questionTextInput.value).toBe("New Question Text");
  });
});

// npx jest src/components/Anamnesis/CreateForm/CreateAnamnesisForm.spec.tsx
