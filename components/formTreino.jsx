import { useState } from "react";
import { Formik, Form, useFormik, Field, ErrorMessage } from "formik";

const FormTreino = () => {
  const validate = (values) => {
    const errorMsg = "Must be 20 characters or less";
    const errors = {};
    if (!values.firstName) {
      errors.firstName = "Preencher nome";
    } else if (values.firstName.length > 20) {
      errors.firstName = errorMsg;
    }

    if (!values.lastName) {
      errors.lastName = "Preencher o Ultimo nome";
    } else if (values.lastName.length > 20) {
      errors.lastName = errorMsg;
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? (
        <div className=" text-vermelho font-thin">
          {formik.errors.firstName}
        </div>
      ) : null}
      <br />
      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? (
        <div className=" text-vermelho font-thin">{formik.errors.lastName}</div>
      ) : null}
      <br />
      <button type="submit">Submit</button>
    </form>
  );
};

export default FormTreino;
