import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Link from "next/link";
export default function Aulas() {
  const initialValues = {
    aula: "",
    turma: "",
    inicio: "",
    fim: "",
    dias: [],
  };

  const [aula, setAula] = useState([]);

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

  const onDelete = async () => {
    await fetch(
      "/api/classes",

      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(router.query.id),
      }
    );
    router.back();
    console.log(router.query.id);
  };
  useEffect(() => {
    fetch(`/api/classes/${router.query.id}`)
      .then((response) => response.json())
      .then((data) => setAula(data));
  }, [router.query.id]);

  //   console.log(
  //     aula.map((a) =>
  //       a.days
  //         .toString()
  //         .split(",")
  //         .map((d) => d[0])
  //     )
  //   );
  //console.log(Array.from(aula.map((a) => a.days)).toString());

  return (
    <div>
      <Navbar />
      <div className="mx-16 py-4 text-center px-8 text-black text-xl font-bold border-b border-grey-500">
        Cadastro de Aulas
      </div>
      {aula && aula.length > 0 ? (
        <Formik
          initialValues={{
            turma: aula.map((a) => a.turma).toString(),
            classe: aula.map((a) => a.classe).toString(),
            inicio: aula.map((a) => a.start).toString(),
            fim: aula.map((a) => a.finish).toString(),
            dias: Array.from(
              aula
                .map((a) => a.days)
                .toString()
                .split(",")
            ),
            _id: router.query.id,
          }}
          //   initialValues={aula}
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
                <label
                  className="font-semibold text-gray-600 py-2"
                  htmlFor="fim"
                >
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
            <div className="flex gap-6 ">
              <button
                className="  mt-5 w-40 px-4 py-2  font-medium text-white bg-azul rounded-lg  hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Cadastrar
              </button>
              <button
                type="button"
                onClick={onDelete}
                className=" mt-5 w-40 px-4 py-2 font-bold text-white bg-vermelho rounded-lg hover:bg-red-800 focus:outline-none focus:shadow-outline"
              >
                Delete
              </button>
              <Link href="/aulas">
                <a>
                  <button className="mt-5 w-40 px-4 py-2  font-medium text-white bg-laranja rounded-lg  hover:bg-yellow-700 focus:outline-none focus:shadow-outline">
                    Cancelar
                  </button>
                </a>
              </Link>
            </div>
          </Form>
        </Formik>
      ) : (
        <div>Carregando</div>
      )}
    </div>
  );
}
