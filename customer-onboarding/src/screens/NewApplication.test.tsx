import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { NewApplication } from "./NewApplication";

vi.mock("../../services/api", () => ({
  api: {
    createApplication: vi.fn(() =>
      Promise.resolve({
        id: "APP-NEW",
        applicant: "Jane Doe",
        product: "Savings Account",
        submitted: "2026-08-28",
        status: "Submitted",
        timeline: [],
      })
    ),
    kycDocument: vi.fn(() =>
      Promise.resolve({ status: "Verified", docType: "Passport", score: 90 })
    ),
    kycWatchlist: vi.fn(() =>
      Promise.resolve({ status: "Clear" })
    ),
    kycLiveness: vi.fn(() =>
      Promise.resolve({ status: "Passed" })
    ),
  },
}));

describe("NewApplication", () => {
  test("renders stepper and personal step", () => {
    render(<NewApplication onBack={() => {}} />);
    expect(screen.getByText("Personal Details")).toBeDefined();
    expect(screen.getByText("Financial")).toBeDefined();
  });

  test("validates required fields on next", async () => {
    render(<NewApplication onBack={() => {}} />);
    fireEvent.click(screen.getByText("Next →"));
    const errors = screen.getAllByText("Required");
    expect(errors.length).toBeGreaterThanOrEqual(1);
  });

  test("proceeds to next step when valid", async () => {
    render(<NewApplication onBack={() => {}} />);
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "Jane" } });
    fireEvent.change(inputs[1], { target: { value: "Doe" } });
    const dateInputs = screen.getAllByDisplayValue("");
    fireEvent.change(dateInputs[0], { target: { value: "1990-01-01" } });
    fireEvent.change(inputs[2], { target: { value: "123-45-6789" } });
    fireEvent.click(screen.getByText("Next →"));
    await waitFor(() => screen.getByText("Financial"));
  });
});
