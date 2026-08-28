import { userGlobalFilter } from "@/features/users/utils/userFilter";
import { describe, expect, it } from "vitest";

describe("userGlobalFilter", () => {
  const user = {
    id: "user-1",
    firstname: "Amir",
    lastname: "Shz",
    email: "amir@example.com",
    country: "Germany",
    status: "Active",
    role: "Admin",
  };

  const createRow = () => ({
    original: user,
  });

  it("should return true when search is empty", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "", () => {})).toBe(true);
  });

  it("should return true when search contains only whitespace", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "   ", () => {})).toBe(true);
  });

  it("should match by first name", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "amir", () => {})).toBe(true);
  });

  it("should match by last name", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "shz", () => {})).toBe(true);
  });

  it("should match by full name", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "amir shz", () => {})).toBe(
      true,
    );
  });

  it("should match by email", () => {
    const row = createRow();

    expect(
      userGlobalFilter(row as never, "name", "amir@example.com", () => {}),
    ).toBe(true);
  });

  it("should match by country", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "germany", () => {})).toBe(
      true,
    );
  });

  it("should match by status", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "active", () => {})).toBe(
      true,
    );
  });

  it("should match by role", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "admin", () => {})).toBe(
      true,
    );
  });

  it("should be case-insensitive", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "AMIR", () => {})).toBe(true);

    expect(userGlobalFilter(row as never, "name", "GERMANY", () => {})).toBe(
      true,
    );

    expect(userGlobalFilter(row as never, "name", "ADMIN", () => {})).toBe(
      true,
    );
  });

  it("should trim the search value", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "  amir  ", () => {})).toBe(
      true,
    );
  });

  it("should return false when user does not match the search", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "john", () => {})).toBe(
      false,
    );
  });

  it("should return false when search partially matches nothing", () => {
    const row = createRow();

    expect(userGlobalFilter(row as never, "name", "xyz123", () => {})).toBe(
      false,
    );
  });
});
