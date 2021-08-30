/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */

import Image from "next/image";
import Classes from "../components/classes";
import ClassesDia from "../components/classesDia";
import Vendas from "../components/vendas";
import Link from "next/link";
import ListAulas from "../components/listAulas";

export default function Home() {
  return (
    <div className="bg-gray-300 min-h-screen overflow-auto">
      <div className="container max-w-5xl mx-auto px-4">
        <div className="w-4/5">
          <h1 className="mt-20 mb-20 w-2/4">
            <img src="logo.svg" alt="" />
          </h1>
        </div>

        <div className="text-black relative">
          <h3 className="text-uppercase font-semibold">Opções</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1 sm:gap-5 uppercase">
            <Link href="/aulas">
              <a>
                <div className="group flex items-center bg-gray-600 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-white ring-gray-400 mt-5 cursor-pointer hover:bg-laranja hover:bg-opacity-100 transition">
                  <img className="w-9" src="aulas_menu.png" alt="" />
                  <div>
                    <span>Aulas</span>
                  </div>
                  <div>
                    <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                  </div>
                </div>
              </a>
            </Link>

            <Link href="/treinos">
              <a>
                <div className="group flex items-center bg-gray-600 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-white ring-gray-400 mt-5 cursor-pointer hover:bg-vermelho hover:bg-opacity-100 transition">
                  <img className="w-9" src="gym.png" alt="" />
                  <div>
                    <span>Treinos</span>
                  </div>
                  <div>
                    <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
                  </div>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
