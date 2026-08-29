import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Badge, Button, Card, Field, Stepper } from "./ui";

describe("Badge", () => {
  test("renders status text", () => {
    render(<Badge status="Approved" />);
    expect(screen.getByText("Approved")).toBeDefined();
  });
});

describe("Button", () => {
  test("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByText("Click"));
    expect(onClick).toHaveBeenCalled();
  });

  test("is disabled when disabled prop is true", () => {
    render(<Button disabled>Click</Button>);
    expect(screen.getByText("Click")).toHaveProperty("disabled", true);
  });
});

describe("Card", () => {
  test("renders children", () => {
    render(<Card>Hello</Card>);
    expect(screen.getByText("Hello")).toBeDefined();
  });
});

describe("Field", () => {
  test("renders label and children", () => {
    render(
      <Field label="Name">
        <input data-testid="inp" />
      </Field>
    );
    expect(screen.getByText("Name")).toBeDefined();
    expect(screen.getByTestId("inp")).toBeDefined();
  });

  test("shows error when provided", () => {
    render(
      <Field label="Name" error="Required">
        <input />
      </Field>
    );
    expect(screen.getByText("Required")).toBeDefined();
  });
});

describe("Stepper", () => {
  test("renders steps", () => {
    render(<Stepper steps={["A", "B", "C"]} current={1} />);
    expect(screen.getByText("A")).toBeDefined();
    expect(screen.getByText("B")).toBeDefined();
    expect(screen.getByText("C")).toBeDefined();
  });
});
