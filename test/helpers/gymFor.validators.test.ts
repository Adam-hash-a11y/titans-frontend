import { describe, expect, it } from "vitest";
import {
  formatPhone,
  isValidBirthDate,
  isValidEmail,
  isValidFirstName,
  isValidGender,
  isValidLastName,
  isValidMembershipPlan,
  isValidPhoneNumber,
  isValidProfileImage,
} from "../../src/helpers/gymForm.validators";

const yearsAgo = (years: number) => {
  const d = new Date();
  d.setFullYear(d.getFullYear() - years);
  return d.toISOString().slice(0, 10);
};

describe("isValidFirstName", () => {
  it("should return empty string for 3 or more characters", () => {
    //ARRANGE
    //ACT
    const result = isValidFirstName("Adam");

    //ASSERT
    expect(result).toBe("");
  });

  it("should accept exactly 3 characters", () => {
    //ARRANGE
    //ACT
    const result = isValidFirstName("Ada");

    //ASSERT
    expect(result).toBe("");
  });

  it("should return an error for less than 3 characters", () => {
    //ARRANGE
    //ACT
    const result = isValidFirstName("Ad");

    //ASSERT
    expect(result).toBe("First name must be at least 3 characters");
  });

  it("should return an error for an empty string", () => {
    //ARRANGE
    //ACT
    const result = isValidFirstName("");

    //ASSERT
    expect(result).toBe("First name must be at least 3 characters");
  });

  it("should return an error for numbers", () => {
    //ARRANGE
    //ACT
    const result = isValidFirstName("Adam123");

    //ASSERT
    expect(result).toBe("First name must contain letters only");
  });

  it("should return an error for special characters", () => {
    //ARRANGE
    //ACT
    const result = isValidFirstName("Adam!");

    //ASSERT
    expect(result).toBe("First name must contain letters only");
  });
});

describe("isValidLastName", () => {
  it("should return empty string for 3 or more characters", () => {
    //ARRANGE
    //ACT
    const result = isValidLastName("Hamdi");

    //ASSERT
    expect(result).toBe("");
  });

  it("should accept exactly 3 characters", () => {
    //ARRANGE
    //ACT
    const result = isValidLastName("Lee");

    //ASSERT
    expect(result).toBe("");
  });

  it("should return an error for less than 3 characters", () => {
    //ARRANGE
    //ACT
    const result = isValidLastName("Li");

    //ASSERT
    expect(result).toBe("Last name must be at least 3 characters");
  });

  it("should return an error for an empty string", () => {
    //ARRANGE
    //ACT
    const result = isValidLastName("");

    //ASSERT
    expect(result).toBe("Last name must be at least 3 characters");
  });

  it("should return an error for numbers", () => {
    //ARRANGE
    //ACT
    const result = isValidLastName("Hamdi123");

    //ASSERT
    expect(result).toBe("Last name must contain letters only");
  });

  it("should return an error for special characters", () => {
    //ARRANGE
    //ACT
    const result = isValidLastName("Hamdi!");

    //ASSERT
    expect(result).toBe("Last name must contain letters only");
  });
});

describe("isValidGender", () => {
  it("should accept male, female and other", () => {
    //ARRANGE
    //ACT
    //ASSERT
    expect(isValidGender("male")).toBe("");
    expect(isValidGender("female")).toBe("");
    expect(isValidGender("other")).toBe("");
  });

  it("should return an error for an empty value", () => {
    //ARRANGE
    //ACT
    const result = isValidGender("");

    //ASSERT
    expect(result).toBe("Please select a gender");
  });

  it("should return an error for an unknown value", () => {
    //ARRANGE
    //ACT
    const result = isValidGender("robot");

    //ASSERT
    expect(result).toBe("Please select a gender");
  });

  it("should be case sensitive", () => {
    //ARRANGE
    //ACT
    const result = isValidGender("Male");

    //ASSERT
    expect(result).toBe("Please select a gender");
  });
});

describe("isValidMembershipPlan", () => {
  it("should accept basic, standard and premium", () => {
    //ARRANGE
    //ACT
    //ASSERT
    expect(isValidMembershipPlan("basic")).toBe("");
    expect(isValidMembershipPlan("standard")).toBe("");
    expect(isValidMembershipPlan("premium")).toBe("");
  });

  it("should return an error for an empty value", () => {
    //ARRANGE
    //ACT
    const result = isValidMembershipPlan("");

    //ASSERT
    expect(result).toBe("Please select a membership plan");
  });

  it("should return an error for an unknown value", () => {
    //ARRANGE
    //ACT
    const result = isValidMembershipPlan("gold");

    //ASSERT
    expect(result).toBe("Please select a membership plan");
  });
});

describe("isValidEmail", () => {
  it("should accept a valid email", () => {
    //ARRANGE
    //ACT
    const result = isValidEmail("adam@example.com");

    //ASSERT
    expect(result).toBe("");
  });

  it("should trim surrounding spaces", () => {
    //ARRANGE
    //ACT
    const result = isValidEmail("  adam@example.com  ");

    //ASSERT
    expect(result).toBe("");
  });

  it("should return an error when @ is missing", () => {
    //ARRANGE
    //ACT
    const result = isValidEmail("adam.example.com");

    //ASSERT
    expect(result).toBe("Please enter a valid email");
  });

  it("should return an error when the domain is missing", () => {
    //ARRANGE
    //ACT
    const result = isValidEmail("adam@");

    //ASSERT
    expect(result).toBe("Please enter a valid email");
  });

  it("should return an error for an empty string", () => {
    //ARRANGE
    //ACT
    const result = isValidEmail("");

    //ASSERT
    expect(result).toBe("Please enter a valid email");
  });
});

describe("isValidProfileImage", () => {
  it("should return empty string when a file is given", () => {
    //ARRANGE
    const file = new File(["img"], "me.png", { type: "image/png" });

    //ACT
    const result = isValidProfileImage(file);

    //ASSERT
    expect(result).toBe("");
  });

  it("should return an error when file is null", () => {
    //ARRANGE
    //ACT
    const result = isValidProfileImage(null);

    //ASSERT
    expect(result).toBe("Profile picture is required");
  });
});

describe("isValidBirthDate", () => {
  it("should return an error when empty", () => {
    //ARRANGE
    //ACT
    const result = isValidBirthDate("");

    //ASSERT
    expect(result).toBe("Birth date is required");
  });

  it("should return an error for an invalid date", () => {
    //ARRANGE
    //ACT
    const result = isValidBirthDate("not-a-date");

    //ASSERT
    expect(result).toBe("Invalid date");
  });

  it("should return an error for a future date", () => {
    //ARRANGE
    const future = yearsAgo(-2);

    //ACT
    const result = isValidBirthDate(future);

    //ASSERT
    expect(result).toBe("Birth date can't be in the future");
  });

  it("should return an error when younger than 16", () => {
    //ARRANGE
    const date = yearsAgo(10);

    //ACT
    const result = isValidBirthDate(date);

    //ASSERT
    expect(result).toBe("You must be at least 16 years old");
  });

  it("should return an error when 15 years old", () => {
    //ARRANGE
    const date = yearsAgo(15);

    //ACT
    const result = isValidBirthDate(date);

    //ASSERT
    expect(result).toBe("You must be at least 16 years old");
  });

  it("should accept someone older than 16", () => {
    //ARRANGE
    const date = yearsAgo(17);

    //ACT
    const result = isValidBirthDate(date);

    //ASSERT
    expect(result).toBe("");
  });

  it("should accept a datetime-local value", () => {
    //ARRANGE
    //ACT
    const result = isValidBirthDate("1995-05-20T10:30");

    //ASSERT
    expect(result).toBe("");
  });
});

describe("formatPhone", () => {
  it("should format a full US number", () => {
    //ARRANGE
    //ACT
    const result = formatPhone("2125551234");

    //ASSERT
    expect(result).toBe("(212) 555-1234");
  });

  it("should format a partial number", () => {
    //ARRANGE
    //ACT
    const result = formatPhone("21255");

    //ASSERT
    expect(result).toBe("(212) 55");
  });

  it("should return empty string for empty input", () => {
    //ARRANGE
    //ACT
    const result = formatPhone("");

    //ASSERT
    expect(result).toBe("");
  });
});

describe("isValidPhoneNumber", () => {
  it("should accept a valid US number", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("2125551234");

    //ASSERT
    expect(result).toBe("");
  });

  it("should accept a formatted US number", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("(212) 555-1234");

    //ASSERT
    expect(result).toBe("");
  });

  it("should return required error for empty input", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("");

    //ASSERT
    expect(result).toBe("Phone number is required. Format: (212) 555-1234");
  });

  it("should return required error for spaces only", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("   ");

    //ASSERT
    expect(result).toBe("Phone number is required. Format: (212) 555-1234");
  });

  it("should return too short error", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("212555");

    //ASSERT
    expect(result).toBe("Phone number is too short. Format: (212) 555-1234");
  });

  it("should return too long error", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("21255512345678");

    //ASSERT
    expect(result).toBe("Phone number is too long. Format: (212) 555-1234");
  });

  it("should return an error for a number with a bad area code", () => {
    //ARRANGE
    //ACT
    const result = isValidPhoneNumber("1115551234");

    //ASSERT
    expect(result).not.toBe("");
  });
});
