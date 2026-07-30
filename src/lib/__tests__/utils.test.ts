import { describe, it, expect } from "vitest";
import { cn, formatCurrency, formatDate, slugify, getInitials } from "../utils";

describe("cn", () => {
  it("should merge class names", () => {
    const result = cn("text-red-500", "text-blue-500");
    expect(result).toBe("text-blue-500");
  });

  it("should handle conditional classes", () => {
    const result = cn("base", true && "active", false && "inactive");
    expect(result).toContain("base");
    expect(result).toContain("active");
    expect(result).not.toContain("inactive");
  });

  it("should handle undefined and null", () => {
    const result = cn("base", undefined, null);
    expect(result).toBe("base");
  });
});

describe("formatCurrency", () => {
  it("should format VND currency", () => {
    const result = formatCurrency(1000000);
    expect(result).toContain("1,000,000");
  });

  it("should handle zero", () => {
    const result = formatCurrency(0);
    expect(result).toContain("0");
  });
});

describe("formatDate", () => {
  it("should format date string", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBeDefined();
  });

  it("should handle Date object", () => {
    const result = formatDate(new Date("2024-01-15"));
    expect(result).toBeDefined();
  });
});

describe("slugify", () => {
  it("should convert string to slug", () => {
    const result = slugify("Hello World");
    expect(result).toBe("hello-world");
  });

  it("should handle special characters", () => {
    const result = slugify("Hello! @World#");
    expect(result).toBe("hello-world");
  });

  it("should handle Vietnamese characters", () => {
    const result = slugify("Sân bóng đá");
    expect(result).toBe("san-bong-da");
  });
});

describe("getInitials", () => {
  it("should get initials from name", () => {
    const result = getInitials("John Doe");
    expect(result).toBe("JD");
  });

  it("should handle single name", () => {
    const result = getInitials("John");
    expect(result).toBe("J");
  });

  it("should handle empty string", () => {
    const result = getInitials("");
    expect(result).toBe("");
  });

  it("should limit to 2 characters", () => {
    const result = getInitials("John Michael Doe");
    expect(result).toBe("JM");
  });
});
