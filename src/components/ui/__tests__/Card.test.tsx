import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Card, CardTitle, CardContent } from "../Card";

describe("Card", () => {
  it("renders children", () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText("Card content")).toBeInTheDocument();
  });

  it("renders with CardTitle", () => {
    render(
      <Card>
        <CardTitle>Card Title</CardTitle>
      </Card>
    );
    expect(screen.getByText("Card Title")).toBeInTheDocument();
  });

  it("renders with CardContent", () => {
    render(
      <Card>
        <CardContent>Subtitle text</CardContent>
      </Card>
    );
    expect(screen.getByText("Subtitle text")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    render(<Card className="custom-class">Content</Card>);
    expect(screen.getByText("Content").closest("div")).toHaveClass(
      "custom-class"
    );
  });

  it("renders with different variants", () => {
    const { rerender } = render(<Card variant="default">Content</Card>);
    expect(screen.getByText("Content").closest("div")).toHaveClass(
      "border-gray-200"
    );

    rerender(<Card variant="elevated">Content</Card>);
    expect(screen.getByText("Content").closest("div")).toHaveClass("shadow-lg");
  });
});
