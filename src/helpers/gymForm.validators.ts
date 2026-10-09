import validator from "validator";
import {
  parsePhoneNumberFromString,
  validatePhoneNumberLength,
} from "libphonenumber-js";
export const isValidFirstName = (value: string) => {
  if (value.length >= 3) {
    return "";
  } else {
    return "First name must be at least 3 characters";
  }
};

export const isValidLastName = (value: string) => {
  if (value.length >= 3) {
    return "";
  } else {
    return "Last  name must be at least 3 characters";
  }
};

const GENDERS = new Set(["male", "female", "other"]);
const MIN_AGE = 16;

export const isValidGender = (value: string) => {
  if (GENDERS.has(value)) {
    return "";
  }
  return "Please select a gender";
};

export const isValidBirthDate = (value: string) => {
  if (!value) {
    return "Birth date is required";
  }

  const birth = new Date(value);
  if (Number.isNaN(birth.getTime())) {
    return "Invalid date";
  }

  const now = new Date();
  if (birth > now) {
    return "Birth date can't be in the future";
  }

  const minBirth = new Date(
    now.getFullYear() - MIN_AGE,
    now.getMonth(),
    now.getDate(),
  );
  if (birth > minBirth) {
    return `You must be at least ${MIN_AGE} years old`;
  }

  return "";
};

const MEMBERSHIP_PLANS = new Set(["basic", "standard", "premium"]);

export const isValidMembershipPlan = (value: string) => {
  if (MEMBERSHIP_PLANS.has(value)) {
    return "";
  }
  return "Please select a membership plan";
};

export const isValidEmail = (value: string) => {
  if (validator.isEmail(value.trim())) {
    return "";
  }
  return "Please enter a valid email";
};

export const isValidProfileImage = (file: File | null) => {
  if (file) {
    return "";
  }
  return "Profile picture is required";
};

export const formatPhone = (value: string) => {
  const d = value.replace(/\D/g, "").slice(0, 10);
  if (d.length === 0) return "";
  if (d.length <= 3) return `(${d}`;
  if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
};
export const isValidPhoneNumber = (value: string) => {
  if (!value.trim()) return "Phone number is required. Format: (212) 555-1234";

  const lengthIssue = validatePhoneNumberLength(value, "US");
  if (lengthIssue === "TOO_SHORT")
    return "Phone number is too short. Format: (212) 555-1234";
  if (lengthIssue === "TOO_LONG")
    return "Phone number is too long. Format: (212) 555-1234";
  if (lengthIssue)
    return "Please enter a valid phone number. Format: (212) 555-1234";

  const phone = parsePhoneNumberFromString(value, "US");
  if (!phone?.isValid())
    return "Please enter a valid US phone number. Format: (212) 555-1234";

  return "";
};
