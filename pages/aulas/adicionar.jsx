import { Formik, Form, Field, ErrorMessage, setFieldValue } from "formik";
import { useRouter } from "next/router";
import Link from "next/link";
import Navbar from "../../components/navbar";
export default function AddAulas() {
  const initialValues = {
    aula: "",
    turma: "",
    inicio: "",
    fim: "",
    dias: [],
  };

  const router = useRouter();

  const onSubmit = async (values, submitProps) => {
    await fetch(
      "/api/classes",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    console.log("Dados", JSON.stringify(values));
    router.back();
    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div>
      <Navbar />
      <div className="mx-16 py-4 text-center px-8 text-black text-xl font-bold border-b border-grey-500">
        Cadastro de Aulas
      </div>

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="aula"
              >
                Aula
              </label>
              <Field
                as="select"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="classe"
                name="classe"
                type="text"
                placeholder="classe"
              >
                <option hidden value="">
                  Modalidade
                </option>

                <option value="natacao">Natação</option>
                <option value="danca">Ballet</option>
                <option value="lutas">Lutas</option>
                <option value="ginastica">Aulas</option>
              </Field>
              <ErrorMessage name="aula" />
            </div>
            <div className="mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="turma"
              >
                Turma
              </label>
              <Field
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="turma"
                name="turma"
                type="text"
                placeholder="Turma"
              />
              <ErrorMessage name="turma" />
            </div>
          </div>
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="inicio"
              >
                Início
              </label>
              <Field
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="inicio"
                name="inicio"
                type="text"
              />
              <ErrorMessage name="inicio" />
            </div>
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2" htmlFor="fim">
                Fim
              </label>
              <Field
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="fim"
                name="fim"
                type="text"
              />
              <ErrorMessage name="fim" />
            </div>
          </div>
          <div className=" text-xl ">Dias de Aula</div>
          <label className="inline-flex items-center mt-3 font-thin mr-4 ">
            <Field
              className="form-checkbox h-5 w-5 mr-2 "
              type="checkbox"
              name="dias"
              value="1"
            />
            Segunda
          </label>
          <label className="inline-flex items-center mt-3 font-thin mr-4">
            <Field
              className="form-checkbox h-5 w-5 mr-2 "
              type="checkbox"
              name="dias"
              value="2"
            />
            Terca
          </label>
          <label className="inline-flex items-center mt-3 font-thin mr-4">
            <Field
              className="form-checkbox h-5 w-5 mr-2 "
              type="checkbox"
              name="dias"
              value="3"
            />
            Quarta
          </label>
          <label className="inline-flex items-center mt-3 font-thin mr-4">
            <Field
              className="form-checkbox h-5 w-5 mr-2 "
              type="checkbox"
              name="dias"
              value="4"
            />
            Quinta
          </label>
          <label className="inline-flex items-center mt-3 font-thin mr-4">
            <Field
              className="form-checkbox h-5 w-5  mr-2"
              type="checkbox"
              name="dias"
              value="5"
            />
            Sexta
          </label>
          <label className="inline-flex items-center mt-3 font-thin mr-4">
            <Field
              className="form-checkbox h-5 w-5 mr-2 "
              type="checkbox"
              name="dias"
              value="6"
            />
            Sábado
          </label>
          <div>
            <button
              className="mt-5 mr-4 w-64 px-4 py-2  font-medium text-white bg-azul rounded-lg  hover:bg-vermelho focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Cadastrar
            </button>
            <Link href="/aulas">
              <a>
                <button className="mt-5 w-64 px-4 py-2  font-medium text-white bg-laranja rounded-lg  hover:bg-verde focus:outline-none focus:shadow-outline">
                  Cancelar
                </button>
              </a>
            </Link>
          </div>
        </Form>
      </Formik>
    </div>
  );
}
