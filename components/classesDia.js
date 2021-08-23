/* eslint-disable @next/next/no-img-element */

import useSWR from "swr";
import api from "../utils/api";
const now = new Date();
const ClassesDia = () => {
  const now = new Date();

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
  var horaCerta = "";
  if (now.getHours() < 10) {
    horaCerta = "0" + now.getHours();
  }
  if (now.getHours() >= 10) {
    horaCerta = now.getHours();
  }

  //console.log(horaCerta);

  const hourFilter = data.data.filter(
    (classes) =>
      classes.start >= horaCerta.toString() &&
      classes.days.includes(now.getDay())
  );

  return (
    <div className="relative bg-white py-6 px-6 rounded-3xl my-4 w-96 overflow-y-auto h-96 block  ">
      <div className=" text-white flex items-center absolute rounded-full py-4 px-4 shadow-xl bg-verde left-4 ">
        <img src="proxima.png" alt="grade" className="w-6" />
      </div>
      <p className="p-4  ml-10 font-medium">Próximas Aulas</p>
      <div className="border-b-2 mt-2"></div>

      <div className="mt-4 overflow-hidden">
        <table className=" w-full table-auto ">
          <thead>
            <tr className="bg-gray-200 text-gray-500 uppercase text-sm leading-normal">
              <th className="py-2 pl-1 text-center">Aula</th>

              <th className="py-2 px-2 text-center">Hora</th>
            </tr>
          </thead>

          <tbody className="text-gray-600 text-sm font-light">
            {hourFilter.map(({ turma, start, finish, _id, icon }) => (
              <tr
                key={_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="p-3">
                  <div className="flex items-center ">
                    <img
                      className="rounded-full h-7 w-7  object-cover"
                      src={icon}
                      alt={turma}
                    />
                    <div className="ml-3 py-2 font-medium pr-1 text-center whitespace-nowrap">
                      {turma}
                    </div>
                  </div>
                </td>
                {/* <td className="py-2 font-thin pr-1 text-center whitespace-nowrap">
                  {turma}
                </td> */}

                <td className="py-2 pr-2 text-center whitespace-nowrap font-medium">
                  {start} - {finish}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClassesDia;
