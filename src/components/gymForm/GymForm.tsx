import * as React from "react";
import { InputField } from "../shared/inputField/InputField";
import { InputType } from "./types";
import { gymFormReducer, initialState } from "./reducer";
import { useReducer } from "react";
import { GymAccodion } from "../gymAccordion/GymAccordion";
import { RESET, SET_FIELD } from "./actions";
import { Form } from "@base-ui/react/form";
import { FormButton } from "../shared/formButton/FormButton";
import { ImageUpload } from "../shared/imageUpload/ImageUpload";
import { registerUser } from "../../services/userService";

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    dispatch({
      type: SET_FIELD,
      payload: { name: e.target.name, value: file },
    });
  };
  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("firstName", state.firstName);
    formData.append("lastName", state.lastName);
    formData.append("email", state.email);
    formData.append("phoneNumber", state.phoneNumber);
    formData.append("birthDate", state.birthDate);
    formData.append("gender", state.gender);
    formData.append("membershipPlan", state.membershipPlan);

    if (state.profileImage) {
      formData.append("profileImage", state.profileImage);
    }

    try {
      const response = await registerUser(formData);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleReset = () => {
    dispatch({ type: RESET });
    console.log("reset");
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
        <ImageUpload
          type={InputType.FILE}
          label="picture"
          id="PictureID"
          name="profileImage"
          handleFileChange={handleImageChange}
        />

        <FormButton type="submit" label="Submit" />
        <FormButton type="button" label="Reset" handleButton={handleReset} />
      </Form>
      <GymAccodion />
    </>
  );
};
