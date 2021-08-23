/* eslint-disable @next/next/no-img-element */

import useSWR from "swr";
import api from "../utils/api";
import { useState } from "react";
import Link from "next/link";

const Classes = (props) => {
  const [searchTurma, setSearchTurma] = useState("");
  const [searchClasse, setSearchClasse] = useState("");

  const { data, error } = useSWR("/api/classes", api);
  if (error) return <div className="text-red-600">Falha ao carregar</div>;
  if (!data)
    return (
      <div className="inline-flex items-center bg-white leading-none text-purple-600 rounded-full p-2 shadow text-teal text-sm">
        <span className="inline-flex bg-verde text-white rounded-full h-6 px-3 justify-center items-center">
          Carregando
        </span>
      </div>
    );

  const dayFilter = data.data.filter(
    (classes) =>
      classes.turma.toLowerCase().includes(searchTurma.toLowerCase()) &&
      classes.classe.includes(searchClasse)
  );

  return (
    <div className="relative bg-gray-100 py-6 px-6 rounded-3xl my-4  overflow-y-auto  block  ">
      <div className="grid grid-cols-3">
        <p className="p-2 text-center col-start-2 text-xl uppercase place-self-center 	">
          Grade de Aulas
        </p>
        <Link href={`/aulas/adicionar`}>
          <a className="col-start-3 place-self-end">
            <button className="bg-azul text-white  py-1 font-light  rounded p-4 text-center ">
              Nova Aula
            </button>
          </a>
        </Link>
      </div>
      <div className="border-b-2 mt-2"></div>
      <div className="flex">
        <span className="absolute p-2 insert-y-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-search mt-4"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
          </svg>
        </span>
        <input
          type="search"
          value={searchTurma}
          onChange={(e) => setSearchTurma(e.target.value)}
          className="mt-4 w-full px-8 py-1  font-thin border-gray-300 border-b focus:outline-none rounded-md"
        />

        {/* <input
          type="search"
          placeholder="Pesquisar Aula"
          value={searchTurma}
          onChange={(e) => setSearchTurma(e.target.value)}
          className="mt-4 overflow-hidden font-thin focus:outline-none  cursor-pointer w-full border-gray-200 rounded-t border"
        ></input> */}

        <select
          value={searchClasse}
          onChange={(e) => setSearchClasse(e.target.value)}
          className="mt-4 overflow-hidden font-thin focus:outline-none  cursor-pointer w-full border-gray-300 rounded-t border-b"
        >
          <option hidden value="">
            Modalidade
          </option>
          <option value="">Todas</option>
          <option value="natacao">Natação</option>
          <option value="danca">Ballet</option>
          <option value="lutas">Lutas</option>
          <option value="ginastica">Aulas</option>
        </select>
      </div>

      <div className="mt-4 overflow-hidden">
        <table className=" w-full table-auto ">
          <thead>
            <tr className="bg-gray-200 text-gray-500 uppercase text-sm leading-normal">
              <th className="py-2 pl-1 text-left">Aula</th>
              <th className="py-2 pl-1 text-left">Turma</th>
              <th className="py-2 pl-1 text-left">Dias</th>
              <th className="py-2 px-2 text-left">Hora</th>
              <th className="py-2 px-2 text-center">Ações</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {dayFilter.map(
              ({ turma, days, classe, start, finish, _id, icon }) => (
                <tr
                  key={_id}
                  className="border-b border-gray-200 hover:bg-white"
                >
                  <td className="">
                    <div className="flex items-left ">
                      <div className=" py-2  pr-1 text-left whitespace-nowrap">
                        {turma}
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-left ">
                      <div className=" py-2 pr-1 text-left whitespace-nowrap">
                        {classe}
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="flex items-left ">
                      <div className="py-2 flex flex-row pr-1 text-left whitespace-nowrap">
                        {days.map((dia, index) => {
                          switch (dia) {
                            case 1:
                              dia = "Seg";
                              break;
                            case 2:
                              dia = "Ter ";
                              break;
                            case 3:
                              dia = "Qua";
                              break;
                            case 4:
                              dia = "Qui";
                              break;
                            case 5:
                              dia = "Sex";
                              break;
                            case 6:
                              dia = "Sab";
                              break;
                          }
                          return (
                            <div className="m-1" key={index}>
                              {dia}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </td>

                  <td className=" text-left whitespace-nowrap ">
                    {start} - {finish}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <Link href={`/aulas/${_id}`}>
                        <a>
                          <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                            <img src="edit.svg" alt="editar" />
                          </div>
                        </a>
                      </Link>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Classes;
