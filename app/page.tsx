'use client'

import Image from "next/image";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PokeCard from "./components/card";
import Link from "next/link";

export default function Home() {
  type Pokemon = {
    name: string;
    url: string;
  };

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();
  // const q = searchParams.get('q');

  const [pokemons, setPokemons] = useState([] as Pokemon[]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(12);


  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${quantity}`);
      const data = await response.json();
      setPokemons(data.results);
      setLoading(false);
      // if (q) {
      //   setQuantity(Number(q));
      // }
    };

    fetchData();
  }, [loading, quantity, ]);
  
  const handleButton = (e: any) => {
    // console.log('clicked');
    setQuantity(quantity + 12);
    // replace(`${pathName}?${params.toString()}`);
  }


  return (
    loading ? <div>Loading...</div> :
    <Suspense>
      <ul className="grid grid-cols-4 gap-4">
        {pokemons.map((pokemon, index) => (
          <li key={index}>
            <div className="flex flex-col items-center justify-center">
              <Link href={`/${pokemon.name}`}>
                <PokeCard name={pokemon.name} url={pokemon.url} />
              </Link>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center justify-center m-8">
        <button onClick={handleButton} className="flex bg-slate-200 text-black font-bold p-3 rounded-md">
          Load more Pokémon!
        </button>
      </div>
    </Suspense>
  );
}
