/* eslint-disable @next/next/no-img-element */
import useSWR from "swr";
import api from "../utils/api";
import { useState, useEffect } from "react";
import Link from "next/link";

const TreinosGrupo = (props) => {
  const [group, setGroup] = useState(2);
  const [treino, setTreino] = useState([]);
  const [atualiza, setAtualiza] = useState();
  //const [_id, set_id] = useState("");

  useEffect(() => {
    if (!group) return;
    fetch(`/api/treinosgrupo/${group}`, {})
      .then((response) => response.json())
      .then((grupo) => setTreino(grupo));
  }, [group, atualiza]);

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

  const { data, error } = useSWR(`/api/treinosgrupo/`, api);
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
        <select
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          className="mt-4 overflow-hidden lowercase text-gray-600 font-thin focus:outline-none  cursor-pointer w-full border-gray-100 rounded-t border-b"
        >
          <option hidden value="">
            Selecione o Treino
          </option>

          {data.data.map((group) => (
            <option key={group.grupo} value={group.grupo}>
              {group.grupo}
            </option>
          ))}
        </select>

        <div className="grid gap-6 mb-8 ">
          {treino.map((grupo, _id) => (
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
                {grupo.exercicios.map((exe, index) => (
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
