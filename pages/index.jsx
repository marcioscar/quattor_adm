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

            <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
              <img className="w-9" src="gym.png" alt="" />
              <div>
                <span>Vue</span>
                <span className="text-xs text-blue-300 block">v3 (beta)</span>
              </div>
              <div>
                <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
              </div>
            </div>

            <div className="group flex items-center bg-indigo-900 bg-opacity-40 shadow-xl gap-5 px-6 py-5 rounded-lg ring-2 ring-offset-2 ring-offset-blue-800 ring-cyan-700 mt-5 cursor-pointer hover:bg-blue-900 hover:bg-opacity-100 transition">
              <img
                className="w-9"
                src="data:image/svg+xml,%3C?xml version='1.0' encoding='utf-8'?%3E %3C!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E %3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 80 80' style='enable-background:new 0 0 80 80;' xml:space='preserve'%3E %3Cstyle type='text/css'%3E .st0%7Bfill:%23FF3E00;%7D .st1%7Bfill:%23FFFFFF;%7D %3C/style%3E %3Cpath className='st0' d='M69,10.6C61.6,0,46.9-3.2,36.3,3.6L17.7,15.4c-5.1,3.2-8.6,8.4-9.7,14.3c-0.9,4.9-0.1,10,2.2,14.5 c-1.6,2.4-2.7,5.1-3.2,8C6,58.2,7.4,64.4,11,69.4c7.5,10.6,22.1,13.8,32.7,7l18.6-11.9c5.1-3.2,8.6-8.4,9.7-14.3 c0.9-4.9,0.1-10-2.2-14.5c1.6-2.4,2.7-5.1,3.2-8C74,21.8,72.6,15.6,69,10.6'/%3E %3Cpath className='st1' d='M34.7,69.6c-5.8,1.5-12-0.8-15.4-5.7c-2.1-2.9-2.9-6.5-2.3-10.1c0.1-0.6,0.2-1.1,0.4-1.7l0.3-1l0.9,0.7 c2.1,1.6,4.5,2.8,7.1,3.5l0.7,0.2l-0.1,0.7c-0.1,1,0.2,1.9,0.7,2.7c1,1.5,2.9,2.2,4.7,1.8c0.4-0.1,0.8-0.3,1.1-0.5l18.1-11.5 c0.9-0.6,1.5-1.5,1.7-2.5c0.2-1.1,0-2.1-0.7-3c-1-1.5-2.9-2.2-4.7-1.7c-0.4,0.1-0.8,0.3-1.1,0.5l-6.9,4.4c-1.1,0.7-2.4,1.3-3.7,1.6 c-5.8,1.5-12-0.8-15.4-5.7c-2.1-2.9-2.9-6.5-2.3-10.1c0.6-3.5,2.7-6.5,5.6-8.4l18.1-11.5c1.1-0.7,2.4-1.3,3.7-1.6 c5.8-1.5,12,0.8,15.4,5.7c2.1,2.9,2.9,6.5,2.3,10.1c-0.1,0.6-0.2,1.1-0.4,1.7l-0.3,1l-0.9-0.7c-2.1-1.6-4.5-2.8-7.1-3.5l-0.7-0.2 l0.1-0.7c0.1-1-0.2-1.9-0.7-2.7c-1-1.5-2.9-2.2-4.7-1.7c-0.4,0.1-0.8,0.3-1.1,0.5L29.1,31.5C28.2,32,27.5,33,27.4,34 c-0.2,1.1,0,2.2,0.7,3c1,1.5,2.9,2.2,4.7,1.7c0.4-0.1,0.8-0.3,1.1-0.5l6.9-4.4c1.1-0.7,2.4-1.3,3.7-1.6c5.8-1.5,12,0.8,15.4,5.7 c2.1,2.9,2.9,6.5,2.3,10.1c-0.6,3.5-2.7,6.5-5.6,8.4L38.4,67.9C37.2,68.7,36,69.2,34.7,69.6'/%3E %3C/svg%3E"
                alt=""
              />
              <div>
                <span>Svelte</span>
                <span className="text-xs text-blue-300 block">Javascript</span>
              </div>
              <div>
                <i className="fa fa-chevron-right opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 block transition"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
