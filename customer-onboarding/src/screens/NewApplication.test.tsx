import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { NewApplication } from "./NewApplication";
import { api } from "../services/api";

vi.mock("../services/api", () => ({
  api: {
    listApplications: vi.fn(),
    getApplication: vi.fn(),
    createApplication: vi.fn().mockResolvedValue({ id: "APP-2026-0999" }),
    decide: vi.fn(),
    kycDocument: vi.fn(),
    kycLiveness: vi.fn(),
    kycWatchlist: vi.fn(),
  },
}));

describe("NewApplication wizard", () => {
  it("blocks advancing past step 1 when required fields are empty", async () => {
    render(<NewApplication onBack={() => {}} />);
    expect(screen.getByText("Personal Details")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /Next/ }));
    // Validation errors appear (negative test case)
    expect(await screen.findAllByText("Required")).not.toHaveLength(0);
    // Still on step 1
    expect(screen.getByText("Personal Details")).toBeInTheDocument();
  });

  it("advances to the Contact step after required fields are filled", async () => {
    render(<NewApplication onBack={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Jane"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Doe"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Date of birth/), {
      target: { value: "1990-01-01" },
    });
    fireEvent.change(screen.getByPlaceholderText("•••-••-••••"), {
      target: { value: "123-45-6789" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Next/ }));
    expect(await screen.findByText("Contact & Address")).toBeInTheDocument();
  });

  it("submits the application when consents are given", async () => {
    render(<NewApplication onBack={() => {}} />);

    // Fill step 1
    fireEvent.change(screen.getByPlaceholderText("Jane"), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText("Doe"), { target: { value: "Doe" } });
    fireEvent.change(screen.getByLabelText(/Date of birth/), { target: { value: "1990-01-01" } });
    fireEvent.change(screen.getByPlaceholderText("•••-••-••••"), { target: { value: "123-45-6789" } });
    fireEvent.click(screen.getByRole("button", { name: /Next/ }));

    // Jump to review (step 5) quickly by filling minimal required and using Next x4
    // Step 2 contact
    fireEvent.change(screen.getByPlaceholderText("jane@example.com"), { target: { value: "jane@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("+1 555 000 0000"), { target: { value: "+1 555 000 0000" } });
    fireEvent.change(screen.getByPlaceholderText("120 Market St, Apt 4B"), { target: { value: "120 Market St" } });
    fireEvent.click(screen.getByRole("button", { name: /Next/ }));
    // Step 3 financial (optional) -> Next
    fireEvent.click(screen.getByRole("button", { name: /Next/ }));
    // Step 4 identity (KYC) -> Next
    fireEvent.click(screen.getByRole("button", { name: /Next/ }));

    // Step 5 review: check both consents
    const consents = screen.getAllByRole("checkbox");
    fireEvent.click(consents[0]);
    fireEvent.click(consents[1]);

    fireEvent.click(screen.getByRole("button", { name: /Submit application/ }));
    expect(await screen.findByText(/Submitting/)).toBeInTheDocument();
    expect(api.createApplication).toHaveBeenCalled();
  });
});
