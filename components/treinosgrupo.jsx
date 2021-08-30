/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import api from "../utils/api";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Form, Field, ErrorMessage } from "formik";
import next from "next";

function getNumberOfWeek() {
  const today = new Date();
  const firstDayOfYear = new Date(today.getFullYear(), 0, 1);
  const pastDaysOfYear = (today - firstDayOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7) - 1;
}

const TreinosGrupo = (props) => {
  const [group, setGroup] = useState(2);
  const [semana, setSemana] = useState(getNumberOfWeek());
  const [semanagrupo, setSemanagrupo] = useState("");
  const [treino, setTreino] = useState([]);
  const [atualiza, setAtualiza] = useState();
  //const [_id, set_id] = useState("");

  useEffect(() => {
    if (!group) return;
    fetch(`/api/treinosgrupo/${group}?semana= ${semana}`)
      .then((response) => response.json())
      .then((grupo) => setTreino(grupo));
  }, [group, atualiza, semana]);

  const onSubmit = async (values, submitProps) => {
    await fetch(
      "/api/treino/grupo",

      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      }
    );

    console.log("Dados", JSON.stringify(values));

    // setAtualiza("ok");
    setSemana(getNumberOfWeek());
    submitProps.setSubmitting(false);
    submitProps.resetForm({});
    // window.location.reload();
  };

  const onDelete = async (id, _id) => {
    const parametros = {
      delid: id,
      del_id: _id,
    };
    await fetch("/api/treino", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parametros),
    });
    setAtualiza("atual");
  };

  function fechar() {
    setSemanagrupo("");
    setAtualiza("atual");
  }
  const { data, error } = useSWR(`/api/treinosgrupo/?semana= ${semana}`, api);
  if (error) return <div className="text-red-600">Falha ao carregar</div>;
  if (!data)
    return (
      <div className="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm">
        <span className="inline-flex bg-verde text-white rounded-full h-6 px-3 justify-center items-center">
          Carregando
        </span>
      </div>
    );

  return (
    <div>
      <div className="container px-2 mx-auto grid">
        <div className="grid place-items-center	gap-4">
          <div className="flex items-baseline gap-5 ">
            <p className="font-semibold text-2xl ">Adicionar Treinos </p>
            <p className="font-thin ">
              Semana:{" "}
              <span className="text-vermelho font-medium">
                {getNumberOfWeek()}
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-3 items-center ">
            <p> Adicionar grupo semana:</p>
            <select
              value={semanagrupo}
              onChange={(e) => setSemanagrupo(e.target.value)}
              className="overflow-hidden lowercase text-gray-600 font-thin focus:outline-none  cursor-pointer w-full border-gray-100 rounded-t border-b"
            >
              <option value="">Selecione a Semana</option>
              <option value="34">34 - (23/8 a 29/8) </option>
              <option value="35">35 - (30/8 a 05/9)</option>
              <option value="36">36 - (6/9 a 12/9)</option>
              <option value="37">37 - (13/9 a 19/9)</option>
              <option value="38">38 - (20 a 26/9)</option>
              <option value="39">39 - (27/9 a 3/10)</option>
              <option value="40">40 - (4/10 a 10/10)</option>
              <option value="41">41 - (11/10 a 17/10)</option>
              <option value="42">42 - (18/10 a 24/10)</option>
              <option value="43">43 - (25/10 a 31/10)</option>
              <option value="44">44 - (1/11 a 7/11)</option>
            </select>
            {semanagrupo && (
              <div className=" bg-gray-100 flex items-center">
                <Formik
                  initialValues={{
                    grupo: "",
                    semanagrupo: semanagrupo,
                    exercicios: [{}],
                  }}
                  enableReinitialize={true}
                  onSubmit={onSubmit}
                  validate={(values) => {
                    let errors = {};
                    if (!values.grupo) {
                      errors.grupo = "Preencha o Grupo";
                    }
                    return errors;
                  }}
                >
                  <Form>
                    <div className="container mx-auto max-w-md shadow-md hover:shadow-lg transition duration-300">
                      <div className="py-4 p-10 bg-white rounded-xl">
                        <div className="mb-6">
                          <label
                            className="mr-4 text-gray-700 font-bold inline-block mb-2"
                            htmlFor="grupo"
                          >
                            Grupo
                          </label>
                          <Field
                            type="text"
                            id="grupo"
                            name="grupo"
                            className="border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
                            placeholder="Grupo de exercícios"
                          />
                          <ErrorMessage
                            className="text-vermelho"
                            name="grupo"
                            component="div"
                          />
                          <Field
                            type="hidden"
                            id="semanagrupo"
                            name="semanagrupo"
                            //value={semanagrupo}
                          />
                        </div>
                        <div className="flex gap-4">
                          <button
                            type="submit"
                            className="w-full mt-2 text-indigo-50 font-bold bg-indigo-600 py-2 rounded-md hover:bg-indigo-500 transition duration-300"
                          >
                            Cadastrar
                          </button>
                          <button
                            onClick={fechar}
                            className="w-full mt-2 text-indigo-50 font-bold bg-indigo-600 py-2 rounded-md hover:bg-indigo-500 transition duration-300"
                          >
                            Fechar
                          </button>
                        </div>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            )}

            {/* <Link
              href={{
                pathname: `/grupo`,
                // query: { nome: exe.nome, index: index },
              }}
            >
              <a>
                <button className="bg-verde inline-flex items-center px-3 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-green-800">
                  <img className="w-4 mr-2" src="feito.png" alt="" />
                  Adicionar Treino Novo
                </button>
              </a>
            </Link> */}
          </div>
        </div>
        <p className="mt-4 font-semibold text-xl text-gray-500 ">
          Adicionar Exercícios - Selecione o treino
        </p>
        <div className="flex gap-3">
          <select
            value={semana}
            onChange={(e) => setSemana(e.target.value)}
            className="overflow-hidden lowercase text-gray-600 font-thin focus:outline-none  cursor-pointer w-full border-gray-100 rounded-t border-b"
          >
            <option hidden value="">
              Selecione a Semana
            </option>
            <option value="34">34 - (23/8 a 29/8) </option>
            <option value="35">35 - (30/8 a 05/9)</option>
            <option value="36">36 - (6/9 a 12/9)</option>
            <option value="37">37 - (13/9 a 19/9)</option>
            <option value="38">38 - (20 a 26/9)</option>
            <option value="39">39 - (27/9 a 3/10)</option>
            <option value="40">40 - (4/10 a 10/10)</option>
            <option value="41">41 - (11/10 a 17/10)</option>
            <option value="42">42 - (18/10 a 24/10)</option>
            <option value="43">43 - (25/10 a 31/10)</option>
            <option value="44">44 - (1/11 a 7/11)</option>
          </select>
          <select
            value={group}
            onChange={(e) => setGroup(e.target.value)}
            className="overflow-hidden lowercase text-gray-600 font-thin focus:outline-none  cursor-pointer w-full border-gray-100 rounded-t border-b"
          >
            <option hidden value="">
              Selecione o Treino para adicionar Exercícios
            </option>

            {data.data.map((group) => (
              <option key={group.grupo} value={group.grupo}>
                {group.grupo}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-6 mb-8 ">
          {treino?.map((grupo, _id) => (
            <div key="_id">
              <div className="flex flex-row justify-between  font-bold text-laranja place-items-center m-2 text-xl">
                {grupo.grupo}

                <Link
                  href={{
                    pathname: `/treino/novo/${grupo._id}`,
                    // query: { nome: exe.nome, index: index },
                  }}
                >
                  <a>
                    <button className="bg-azul inline-flex items-center px-3 py-2 text-sm shadow-sm font-medium tracking-wider border text-white rounded-full hover:shadow-lg hover:bg-green-800">
                      <img className="w-4 mr-2" src="feito.png" alt="" />
                      Adicionar
                    </button>
                  </a>
                </Link>
              </div>
              <div className=" grid  gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {grupo.exercicios?.map((exe, index) => (
                  <div
                    key={index}
                    className="mb-2 font-thin p-2 bg-white rounded-lg shadow "
                  >
                    <div>
                      <div className="flex flex-row justify-between">
                        <div
                          id={exe.nome}
                          className="text-lg text-verde  font-normal"
                          //className={feito ? "text-verde" : "text-vermelho"}
                        >
                          {exe.nome}
                        </div>
                        <div className="flex gap-3">
                          <Link
                            href={{
                              pathname: `/treino/${grupo._id}`,
                              query: { nome: exe.nome, index: index },
                            }}
                          >
                            {/* <Link href={`/treino/${grupo._id}`}> */}
                            <a>
                              <button className="uppercase p-2 flex items-center bg-verde  max-w-max shadow-sm hover:shadow-lg rounded-md w-8 h-8 ">
                                <img src="edit.png" alt="" />
                              </button>
                            </a>
                          </Link>

                          <button
                            onClick={() => {
                              onDelete(exe.id, grupo._id);
                            }}
                            //onClick={onDelete}
                            className="uppercase p-2 flex items-center bg-vermelho  max-w-max shadow-sm hover:shadow-lg rounded-md w-8 h-8 "
                          >
                            <img src="delete.png" alt="" />
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center content-around">
                        <img className=" w-4 mr-3" src="repetir.png" alt="" />
                        <p>{exe.Repeticoes}</p>
                      </div>
                      <div className="flex items-center content-around lowercase">
                        <img className="w-4 mr-3" src="carga.png" alt="" />
                        <p>{exe.carga}</p>
                      </div>

                      <div className="flex items-center content-around lowercase ">
                        <img className="w-4 mr-3" src="atencao.png" alt="" />
                        <p>{exe.obs}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default TreinosGrupo;
