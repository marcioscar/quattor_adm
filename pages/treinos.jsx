/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import Navbar from "../components/navbar";
import TreinosGrupo from "../components/treinosgrupo";
const EVO_AUTH = process.env.NEXT_PUBLIC_EVO_AUTH;
function Treinos() {
  //const evo = process.env.EVO_AUTH;
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState([]);
  const [ultimo, setUltimo] = useState([]);

  return (
    <main className="bg-gray-100">
      <Navbar link="/" icon="/home.svg" legenda="Home" />

      <TreinosGrupo />
    </main>
  );
}

export default Treinos;
