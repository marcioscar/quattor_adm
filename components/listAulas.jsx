import { Formik, Form, Field, ErrorMessage } from "formik";
import Classes from "./classes";
const listAulas = () => {
  const initialValues = {
    aula: "",
    turma: "",
    inicio: "",
    fim: "",
    dias: [],
  };

  const onSubmit = (values, submitProps) => {
    console.log("Dados", values);
    console.log("submitProps", submitProps);
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };
  return (
    <div>
      <Classes />
    </div>
  );
};

export default listAulas;
