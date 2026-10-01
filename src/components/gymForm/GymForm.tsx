import * as React from "react";
import { InputField } from "../shared/inputField/InputField";
import { InputType } from "./types";
import { gymFormReducer, initialState } from "./reducer";
import { useReducer } from "react";
import { RESET, SET_FIELD, SET_TOUCHED } from "./actions";
import { Form } from "@base-ui/react/form";
import { FormButton } from "../shared/formButton/FormButton";
import { ImageUpload } from "../shared/imageUpload/ImageUpload";
import { registerUser } from "../../services/userService";
import styles from "./index.module.css";
import { toast, ToastContainer } from "react-toastify";
import { ALLOWED_TYPES, MAX_IMAGE_SIZE } from "./constants";
import {
  isValidBirthDate,
  isValidEmail,
  isValidFirstName,
  isValidGender,
  isValidLastName,
  isValidMembershipPlan,
  isValidProfileImage,
} from "../../helpers/gymForm.validators";

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
    dispatch({ type: SET_TOUCHED, payload: { name: "profileImage" } });

    const file = e.target.files?.[0];
    if (!file) return;

    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error("Only JPG, PNG or WebP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Image must be 5MB or smaller.");
      e.target.value = "";
      return;
    }

    dispatch({
      type: SET_FIELD,
      payload: { name: e.target.name, value: file },
    });
  };

  const handleRemoveImage = () => {
    dispatch({ type: SET_TOUCHED, payload: { name: "profileImage" } });
    dispatch({
      type: SET_FIELD,
      payload: { name: "profileImage", value: null },
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
      toast.success("Registered successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };
  const handleReset = () => {
    dispatch({ type: RESET });
    console.log("reset");
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    dispatch({
      type: SET_TOUCHED,
      payload: { name: e.target.name },
    });
  };

  const errors = {
    firstName: isValidFirstName(state.firstName),
    lastName: isValidLastName(state.lastName),
    birthDate: isValidBirthDate(state.birthDate),
    gender: isValidGender(state.gender),
    membershipPlan: isValidMembershipPlan(state.membershipPlan),
    email: isValidEmail(state.email),
    profileImage: isValidProfileImage(state.profileImage),
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
            handleBlur={handleBlur}
            touched={state.touched.firstName}
            error={errors.firstName}
          />
          <InputField
            name="lastName"
            handleFieldChange={handleFieldChange}
            label="LAST NAME*"
            type={InputType.TEXT}
            placeholder="e.g. Hamdi"
            value={state.lastName}
            id="LastNameID"
            handleBlur={handleBlur}
            touched={state.touched.lastName}
            error={errors.lastName}
          />
        </div>
        <div className={styles.fieldRow}>
          <InputField
            name="birthDate"
            handleFieldChange={handleFieldChange}
            handleBlur={handleBlur}
            touched={state.touched.birthDate}
            error={errors.birthDate}
            label="BIRTH DATE*"
            type={InputType.DATE_TIME_LOCAL}
            placeholder=""
            value={state.birthDate}
            id="BirthDateID"
          />
          <InputField
            name="gender"
            handleFieldChange={handleFieldChange}
            handleBlur={handleBlur}
            touched={state.touched.gender}
            error={errors.gender}
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
            handleBlur={handleBlur}
            touched={state.touched.membershipPlan}
            error={errors.membershipPlan}
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
            type={InputType.TEL}
            placeholder="Phone Number"
            value={state.phoneNumber}
            id="PhoneNumberID"
          />
        </div>
        <InputField
          name="email"
          handleFieldChange={handleFieldChange}
          handleBlur={handleBlur}
          touched={state.touched.email}
          error={errors.email}
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
          file={state.profileImage}
          handleFileChange={handleImageChange}
          handleRemove={handleRemoveImage}
          handleBlur={handleBlur}
          touched={state.touched.profileImage}
          error={errors.profileImage}
        />
        <div className={styles.fieldRow}>
          <FormButton type="button" label="Reset" handleButton={handleReset} />
          <FormButton type="submit" label="Submit" />
        </div>
      </Form>
      <ToastContainer />
    </div>
  );
};
