// src/tests/features/auth/getAuthErrorMessage.test.ts

import { getAuthErrorMessage } from "@/shared/utils/getAuthErrorMessage";
import { describe, expect, it } from "vitest";



describe("getAuthErrorMessage", () => {
  it("should return the correct message for invalid login credentials", () => {
    expect(
      getAuthErrorMessage("Invalid login credentials"),
    ).toBe("Invalid email or password.");
  });

  it("should return the correct message when email is not confirmed", () => {
    expect(
      getAuthErrorMessage("Email not confirmed"),
    ).toBe(
      "Please verify your email before signing in.",
    );
  });

  it("should return the correct message when user is already registered", () => {
    expect(
      getAuthErrorMessage("User already registered"),
    ).toBe(
      "An account with this email already exists.",
    );
  });

  it("should return the default message for an unknown error", () => {
    expect(
      getAuthErrorMessage("Unknown error"),
    ).toBe(
      "Something went wrong. Please try again.",
    );
  });

  it("should return the default message for an empty message", () => {
    expect(
      getAuthErrorMessage(""),
    ).toBe(
      "Something went wrong. Please try again.",
    );
  });
});