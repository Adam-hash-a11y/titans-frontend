import validator from "validator";
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
