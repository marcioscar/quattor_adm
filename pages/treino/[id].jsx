import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../../components/navbar";
export default function Treino(props) {
  const router = useRouter();
  const [treino, setTreino] = useState([]);

  console.log(router.query.id);

  useEffect(() => {
    fetch(`/api/treino/${router.query.id}`)
      .then((response) => response.json())
      .then((data) => setTreino(data));
  }, [router.query.id]);

  const indice = router.query.index;

  const onSubmit = async (values, submitProps) => {
    await fetch(
      "/api/treino",

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

  const onDelete = async (values, submitProps) => {
    await fetch(
      "/api/treino",

      {
        method: "DELETE",
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
        Cadastro de Treinos
      </div>
      <Formik
        initialValues={{
          nome: treino.map((t, index) => t.exercicios[indice].nome).toString(),
          Repeticoes: treino
            .map((t, index) => t.exercicios[indice].Repeticoes)
            .toString(),
          carga: treino
            .map((t, index) => t.exercicios[indice].carga)
            .toString(),
          obs: treino.map((t, index) => t.exercicios[indice].obs).toString(),
          id: treino.map((t, index) => t.exercicios[indice].id).toString(),
          _id: router.query.id,
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
        onDelete={onDelete}
      >
        <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className="mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="exercicio"
              >
                Exercício
              </label>
              <Field
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="nome"
                name="nome"
                type="text"
                placeholder="Nome do Exercício"
              />
              <ErrorMessage name="nome" />
            </div>
          </div>
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="Repeticoes"
              >
                Repetições
              </label>
              <Field
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="Repeticoes"
                name="Repeticoes"
                type="text"
              />
              <ErrorMessage name="Repeticoes" />
            </div>
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="carga"
              >
                Carga
              </label>
              <Field
                as="textarea"
                className="h-16 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg px-4"
                id="carga"
                name="carga"
                type="text"
              />
              <ErrorMessage name="carga" />
            </div>
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label className="font-semibold text-gray-600 py-2" htmlFor="obs">
                Observações
              </label>
              <Field
                as="textarea"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-16 px-4"
                id="obs"
                name="obs"
                type="text"
              />
              <ErrorMessage name="obs" />
            </div>
          </div>

          <div className="flex gap-6 ">
            <button
              className="  mt-5 w-40 px-4 py-2  font-medium text-white bg-azul rounded-lg  hover:bg-blue-700 focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Cadastrar
            </button>

            <Link href="/treinos">
              <a>
                <button className="mt-5 w-40 px-4 py-2  font-medium text-white bg-laranja rounded-lg  hover:bg-yellow-700 focus:outline-none focus:shadow-outline">
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
