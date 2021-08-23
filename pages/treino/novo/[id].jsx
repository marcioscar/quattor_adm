import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

import Navbar from "../../../components/navbar";
export default function Treino(props) {
  const router = useRouter();
  const [treino, setTreino] = useState([]);
  const [atualiza, setAtualiza] = useState([]);
  const id = Math.random().toString(36).substr(2, 7);
  console.log(router.query.id);

  useEffect(() => {
    fetch(`/api/treino/${router.query.id}`)
      .then((response) => response.json())
      .then((data) => setTreino(data));
  }, [router.query.id, atualiza]);

  const indice = router.query.index;

  const onSubmit = async (values, submitProps) => {
    await fetch(
      "/api/treino/novo",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    console.log("Dados", JSON.stringify(values));
    setAtualiza("ok");
    //router.back();

    submitProps.setSubmitting(false);
    submitProps.resetForm();
  };

  return (
    <div>
      <Navbar />
      <div className="mx-16 py-4 text-center px-8 text-gray-400 uppercase text-xl font-bold border-b border-grey-500">
        Cadastro de Treinos{" "}
        <div className="text-laranja text-medium font-medium lowercase ">
          {treino.map((t) => t.grupo)}
        </div>
      </div>
      <Formik
        initialValues={{
          nome: "",
          Repeticoes: "",
          carga: "",
          obs: "",
          id: id,
          _id: router.query.id,
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
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
                className="h-16 appearance-none block w-full bg-grey-lighter text-grey-darker  border border-grey-lighter rounded-lg px-4"
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
                className=" h-16 appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg px-4"
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

      <div className="grid w-full  place-items-center	gap-4">
        <div className="text-verde text-xl  mb-2">Treinos Cadastrados</div>
        <div className="p-4">
          <table className=" table-fixed md:table-auto overflow-hidden md:w-1/2">
            <thead>
              <tr className="bg-gray-200 text-gray-500 uppercase text-sm leading-normal">
                <th className="py-2 pl-1 text-left">Exercicio</th>
                <th className="py-2 pl-1 text-left">Repetições</th>
                <th className="py-2 pl-1 text-left">Carga</th>
                <th className="py-2 px-2 w-1/4 text-left">Observação</th>
              </tr>
            </thead>

            <tbody className="text-gray-600 text-sm font-light">
              {treino.map((t) =>
                t.exercicios.map((e) => (
                  <tr
                    key={e.id}
                    className="border-b border-gray-200 hover:bg-white"
                  >
                    <td>
                      <div className="flex items-left ">
                        <div className=" py-2  pr-1 text-left whitespace-nowrap">
                          {e.nome}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-left ">
                        <div className=" py-2  pr-1 text-left whitespace-nowrap">
                          {e.Repeticoes}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-left ">
                        <div className=" py-2  pr-1 text-left whitespace-nowrap">
                          {e.carga}
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-left ">
                        <div className=" py-2  pr-1 text-left whitespace-nowrap">
                          {e.obs}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
