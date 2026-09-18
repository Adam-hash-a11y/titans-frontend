import { RESET, SET_FIELD, type Action } from "./actions";
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
};

export const gymFormReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case SET_FIELD: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
    case RESET: {
      return initialState;
    }

    default:
      return state;
  }
};
