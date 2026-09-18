import * as React from "react";
import { InputField } from "../shared/inputField/InputField";
import { InputType } from "./types";
import { gymFormReducer, initialState } from "./reducer";
import { useReducer } from "react";
import { GymAccodion } from "../gymAccordion/GymAccordion";
import { SET_FIELD } from "./actions";
import { Form } from "@base-ui/react/form";
import { Button } from "@base-ui/react/button";

export const GymForm = () => {
  const [state, dispatch] = useReducer(gymFormReducer, initialState);
  console.log(state);

  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch({
      type: SET_FIELD,
      payload: { value: e.target.value, name: e.target.name },
    });
  };

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputField
          name="firstName"
          handleFieldChange={handleFieldChange}
          label="First Name"
          type={InputType.TEXT}
          placeholder="e.g. Adam "
          value={state.firstName}
          id="FirstNameID"
        />
        <InputField
          name="lastName"
          handleFieldChange={handleFieldChange}
          label="Last Name"
          type={InputType.TEXT}
          placeholder="e.g. Hamdi"
          value={state.lastName}
          id="LastNameID"
        />
        <InputField
          name="birthDate"
          handleFieldChange={handleFieldChange}
          label="Birth Date"
          type={InputType.DATE_TIME_LOCAL}
          placeholder=""
          value={state.birthDate}
          id="BirthDateID"
        />
        <InputField
          name="gender"
          handleFieldChange={handleFieldChange}
          label="Gender"
          type={InputType.SELECT}
          placeholder="Select gender"
          value={state.gender}
          id="GenderID"
          options={[
            { label: "Male", value: "male" },
            { label: "Female", value: "female" },
            { label: "Other", value: "other" },
          ]}
        />
        <InputField
          name="membershipPlan"
          handleFieldChange={handleFieldChange}
          label="Membership Plan"
          type={InputType.SELECT}
          placeholder="Select plan"
          value={state.membershipPlan}
          id="MembershipPlanID"
          options={[
            { label: "Basic", value: "basic" },
            { label: "Standard", value: "standard" },
            { label: "Premium", value: "premium" },
          ]}
        />
        <InputField
          name="phoneNumber"
          handleFieldChange={handleFieldChange}
          label="phone number"
          type={InputType.NUMBER}
          placeholder="Phone Number"
          value={state.phoneNumber}
          id="PhoneNumberID"
        />
        <InputField
          name="email"
          handleFieldChange={handleFieldChange}
          label="Email"
          type={InputType.TEXT}
          placeholder="Enter you Email"
          value={state.email}
          id="EmailID"
        />
        <Button type="submit">Submit</Button>
      </Form>
      <GymAccodion />
    </>
  );
};
