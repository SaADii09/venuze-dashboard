import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { useLocalStorage } from "../useLocalStorage";

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("should return initial value when no stored value", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));
    expect(result.current[0]).toBe("initial");
  });

  it("should return stored value when exists", () => {
    window.localStorage.setItem("key", JSON.stringify("stored"));
    const { result } = renderHook(() => useLocalStorage("key", "initial"));
    expect(result.current[0]).toBe("stored");
  });

  it("should update localStorage when value changes", () => {
    const { result } = renderHook(() => useLocalStorage("key", "initial"));

    act(() => {
      result.current[1]("updated");
    });

    expect(result.current[0]).toBe("updated");
    expect(JSON.parse(window.localStorage.getItem("key")!)).toBe("updated");
  });

  it("should handle function updates", () => {
    const { result } = renderHook(() => useLocalStorage("key", 1));

    act(() => {
      result.current[1]((prev) => prev + 1);
    });

    expect(result.current[0]).toBe(2);
  });

  it("should handle complex objects", () => {
    const initial = { name: "test", count: 0 };
    const { result } = renderHook(() => useLocalStorage("key", initial));

    act(() => {
      result.current[1]({ name: "updated", count: 1 });
    });

    expect(result.current[0]).toEqual({ name: "updated", count: 1 });
  });
});
