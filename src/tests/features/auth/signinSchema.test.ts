import { signInSchema } from "@/features/auth";
import { describe, it, expect } from "vitest";


describe("signInSchema", () => {
  

  it("should validate successfully with correct email and password", () => {
    const validData = { email: "test@example.com", password: "password123" };
    const result = signInSchema.safeParse(validData);
    
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).toEqual(validData);
    }
  });


  it("should fail if email format is invalid", () => {
    const invalidData = { email: "invalid-email", password: "password123" };
    const result = signInSchema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Invalid email");
    }
  });


  it("should fail if email is empty", () => {
    const invalidData = { email: "", password: "password123" };
    const result = signInSchema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Email is required");
    }
  });


  it("should fail if password is less than 6 characters", () => {
    const invalidData = { email: "test@example.com", password: "123" };
    const result = signInSchema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 6 characters");
    }
  });


  it("should fail if password is empty", () => {
    const invalidData = { email: "test@example.com", password: "" };
    const result = signInSchema.safeParse(invalidData);
    
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Password must be at least 6 characters");
    }
  });
});