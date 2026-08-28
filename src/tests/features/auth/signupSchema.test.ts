import { signUpSchema } from "@/features/auth";
import { describe, it, expect } from "vitest";


describe("signUpSchema", () => {
  const validData = {
    fname: "John",
    lname: "Doe",
    email: "john.doe@example.com",
    password: "Password123",
    terms: true,
  };

  it("should validate successfully with correct data", () => {
    const result = signUpSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it("should fail if fname is less than 2 characters", () => {
    const result = signUpSchema.safeParse({ ...validData, fname: "J" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("First name must be at least 2 characters.");
    }
  });

  it("should fail if lname is less than 2 characters", () => {
    const result = signUpSchema.safeParse({ ...validData, lname: "D" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Last name must be at least 2 characters.");
    }
  });

  it("should fail if email is invalid", () => {
    const result = signUpSchema.safeParse({ ...validData, email: "invalid-email" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Please enter a valid email address.");
    }
  });

  it("should fail if password is less than 8 characters", () => {
    const result = signUpSchema.safeParse({ ...validData, password: "Pass1" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 8 characters.");
    }
  });

  it("should fail if password has no uppercase letter", () => {
    const result = signUpSchema.safeParse({ ...validData, password: "password123" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must contain at least one uppercase letter.");
    }
  });

  it("should fail if password has no lowercase letter", () => {
    const result = signUpSchema.safeParse({ ...validData, password: "PASSWORD123" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must contain at least one lowercase letter.");
    }
  });

  it("should fail if password has no number", () => {
    const result = signUpSchema.safeParse({ ...validData, password: "Password" });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must contain at least one number.");
    }
  });

  it("should fail if terms are not accepted", () => {
    const result = signUpSchema.safeParse({ ...validData, terms: false });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("You must accept the Terms and Conditions.");
    }
  });

  it("should trim spaces around fname, lname, and email", () => {
    const result = signUpSchema.safeParse({
      ...validData,
      fname: "  John  ",
      lname: "  Doe  ",
      email: "  john.doe@example.com  ",
    });
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.fname).toBe("John");
      expect(result.data.lname).toBe("Doe");
      expect(result.data.email).toBe("john.doe@example.com");
    }
  });
});