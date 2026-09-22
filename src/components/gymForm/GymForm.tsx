import * as React from "react";
import { InputField } from "../shared/inputField/InputField";
import { InputType } from "./types";
import { gymFormReducer, initialState } from "./reducer";
import { useReducer } from "react";
import { RESET, SET_FIELD } from "./actions";
import { Form } from "@base-ui/react/form";
import { FormButton } from "../shared/formButton/FormButton";
import { ImageUpload } from "../shared/imageUpload/ImageUpload";
import { registerUser } from "../../services/userService";
import styles from "./index.module.css";

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
    <div className={styles.Container}>
      <div className={styles.Intro}>
        <h2>Join Titans</h2>
        <h1>CREATE YOUR ACCOUNT</h1>
        <p>
          Start you journey. Fill in you details to get started with your
          membership.
        </p>
      </div>
      <Form className={styles.Form} onSubmit={handleSubmit}>
        <div className={styles.fieldRow}>
          <InputField
            name="firstName"
            handleFieldChange={handleFieldChange}
            label="FIRST NAME*"
            type={InputType.TEXT}
            placeholder="e.g. Adam "
            value={state.firstName}
            id="FirstNameID"
          />
          <InputField
            name="lastName"
            handleFieldChange={handleFieldChange}
            label="LAST NAME*"
            type={InputType.TEXT}
            placeholder="e.g. Hamdi"
            value={state.lastName}
            id="LastNameID"
          />
        </div>
        <div className={styles.fieldRow}>
          <InputField
            name="birthDate"
            handleFieldChange={handleFieldChange}
            label="BIRTH DATE*"
            type={InputType.DATE_TIME_LOCAL}
            placeholder=""
            value={state.birthDate}
            id="BirthDateID"
          />
          <InputField
            name="gender"
            handleFieldChange={handleFieldChange}
            label="GENDER*"
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
        </div>
        <div className={styles.fieldRow}>
          <InputField
            name="membershipPlan"
            handleFieldChange={handleFieldChange}
            label="MEMBERSHIP PLAN*"
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
            label="PHONE NUMBER*"
            type={InputType.NUMBER}
            placeholder="Phone Number"
            value={state.phoneNumber}
            id="PhoneNumberID"
          />
        </div>
        <InputField
          name="email"
          handleFieldChange={handleFieldChange}
          label="EMAIL*"
          type={InputType.TEXT}
          placeholder="Enter you Email"
          value={state.email}
          id="EmailID"
        />
        <ImageUpload
          type={InputType.FILE}
          label="PROFILE PICTURE*"
          id="PictureID"
          name="profileImage"
          handleFileChange={handleImageChange}
        />
        <div className={styles.fieldRow}>
          <FormButton type="button" label="Reset" handleButton={handleReset} />
          <FormButton type="submit" label="Submit" />
        </div>
      </Form>
    </div>
  );
};
