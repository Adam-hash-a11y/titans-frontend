import {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidBirthDate,
  isValidGender,
  isValidMembershipPlan,
  isValidPhoneNumber,
} from "../../helpers/gymForm.validators";
import { RESET, SET_FIELD, SET_TOUCHED, type Action } from "./actions";
import type { Gender, MembershipPlan } from "./types";

export interface State {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  birthDate: string;
  gender: Gender | "";
  profileImage: File | null;
  membershipPlan: MembershipPlan | "";
  touched: {
    firstName: boolean;
    lastName: boolean;
    email: boolean;
    phoneNumber: boolean;
    birthDate: boolean;
    gender: boolean;
    profileImage: boolean;
    membershipPlan: boolean;
  };
}

export const initialState: State = {
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
  gender: "",
  profileImage: null,
  membershipPlan: "",
  touched: {
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
    birthDate: false,
    gender: false,
    profileImage: false,
    membershipPlan: false,
  },
};

export const gymFormReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_FIELD: {
      const value = action.payload.value as string;
      const newTouched = { ...state.touched };

      if (action.payload.name === "firstName") {
        if (isValidFirstName(value) === "") {
          newTouched.firstName = true;
        }
      }
      if (action.payload.name === "lastName") {
        if (isValidLastName(value) === "") {
          newTouched.lastName = true;
        }
      }
      if (action.payload.name === "email") {
        if (isValidEmail(value) === "") {
          newTouched.email = true;
        }
      }
      if (action.payload.name === "phoneNumber") {
        if (isValidPhoneNumber(value) === "") {
          newTouched.phoneNumber = true;
        }
      }
      if (action.payload.name === "birthDate") {
        if (isValidBirthDate(value) === "") {
          newTouched.birthDate = true;
        }
      }
      if (action.payload.name === "gender") {
        if (isValidGender(value) === "") {
          newTouched.gender = true;
        }
      }
      if (action.payload.name === "membershipPlan") {
        if (isValidMembershipPlan(value) === "") {
          newTouched.membershipPlan = true;
        }
      }

      return {
        ...state,
        [action.payload.name]: action.payload.value,
        touched: newTouched,
      };
    }

    case RESET: {
      return initialState;
    }

    case SET_TOUCHED: {
      return {
        ...state,
        touched: { ...state.touched, [action.payload.name]: true },
      };
    }

    default:
      return state;
  }
};
