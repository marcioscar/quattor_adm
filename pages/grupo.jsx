/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import Link from "next/link";

import { Formik, Form, Field, ErrorMessage } from "formik";
function Grupos() {
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
      <Navbar link="/" icon="/home.svg" legenda="Home" />
      <div className="mx-16 py-4 text-center px-8 text-gray-400  text-xl font-bold border-b border-grey-500">
        <div className="text-laranja text-medium font-medium  ">
          Cadastro de Grupo de Treinamento
        </div>
      </div>
      <Formik
        initialValues={{
          grupo: "",
          semana: "",
          exercicios: [{}],
        }}
        enableReinitialize={true}
        onSubmit={onSubmit}
      >
        <Form className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className="mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="grupo"
              >
                Grupo de treino
              </label>
              <Field
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="grupo"
                name="grupo"
                type="text"
                placeholder="Grupo"
              />
              <ErrorMessage name="grupo" />
            </div>
          </div>
          <div className="md:flex flex-row md:space-x-4 w-full text-xs">
            <div className=" mb-3 space-y-2 w-full text-xs">
              <label
                className="font-semibold text-gray-600 py-2"
                htmlFor="semana"
              >
                Semana
              </label>
              <Field
                as="select"
                className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded-lg h-10 px-4"
                id="semana"
                name="semana"
                type="text"
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
              </Field>
              <ErrorMessage name="semana" />
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

export default Grupos;
