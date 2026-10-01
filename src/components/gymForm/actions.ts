export const SET_FIELD = "set_field";
export const RESET = "reset";
export const SET_TOUCHED = "set_touched";

export type Action =
  | {
      type: typeof SET_FIELD;
      payload: { name: string; value: string | File | null };
    }
  | { type: typeof SET_TOUCHED; payload: { name: string } }
  | { type: typeof RESET };
