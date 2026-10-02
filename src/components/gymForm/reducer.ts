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
    case SET_FIELD:
      return { ...state, [action.payload.name]: action.payload.value };

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
