import { fireEvent, render, screen } from "@testing-library/react";

import mockForms from "../../../mockDatas/forms";
import UpdateAnamnesisForm from "./UpdateAnamnesisForm";
import { AnamnesisForm } from "@/models/AnamnesisFormModel";

const forms: AnamnesisForm[] = [mockForms[0]];

describe("UpdateAnamnesisForm", () => {
  const setup = () => {
    const setForms = jest.fn();
    const handlePreviousPage = jest.fn();

    render(
      <UpdateAnamnesisForm
        id={1}
        forms={forms}
        setForms={setForms}
        handlePreviousPage={handlePreviousPage}
      />
    );

    return {
      setForms,
      handlePreviousPage,
    };
  };

  it("renders the form with the correct initial values", () => {
    setup();

    expect(screen.getByPlaceholderText("Title")).toHaveValue("General Health");
    expect(screen.getByPlaceholderText("Description")).toHaveValue(
      "General health questions"
    );
  });

  it("updates form title and description correctly", () => {
    const { setForms } = setup();

    fireEvent.change(screen.getByPlaceholderText("Title"), {
      target: { value: "Updated Form 1" },
    });
    fireEvent.change(screen.getByPlaceholderText("Description"), {
      target: { value: "Updated Description 1" },
    });

    fireEvent.click(screen.getByText("Update Form"));

    expect(setForms).toHaveBeenCalledWith([
      {
        id: 1,
        title: "Updated Form 1",
        description: "Updated Description 1",
        createdAt: "2023-01-01",
        sections: mockForms[0].sections,
      },
    ]);
  });

  it("adds a new section", () => {
    setup();
    fireEvent.click(screen.getByText("Add Section"));

    expect(screen.getAllByPlaceholderText("Section Title")).toHaveLength(2);
  });


  it("adds a new question to a section", () => {
    setup();
    fireEvent.click(screen.getByText("Add Question"));

    expect(screen.getAllByPlaceholderText("Question Text")).toHaveLength(3);
  });

  it("removes a question from a section", () => {
    setup();
    const removeButtons = screen.getAllByPlaceholderText("Remove Question")
    fireEvent.click(removeButtons[2]);

    expect(screen.getAllByPlaceholderText("Question Text")).toHaveLength(2);
  });

  it("removes a section", () => {
    setup();
    fireEvent.click(screen.getByPlaceholderText("Remove Section"));

    expect(screen.queryByPlaceholderText("Section Title")).not.toBeInTheDocument();
  });

  it('calls handlePreviousPage when "Back" button is clicked', () => {
    const { handlePreviousPage } = setup();
    fireEvent.click(screen.getByText("Back"));
    expect(handlePreviousPage).toHaveBeenCalled();
  });
});

// npx jest src/components/Anamnesis/UpdateForm/UpdateAnamnesisForm.spec.tsx
