'use client'
import { serializePageInfos } from "next/dist/build/utils";
import { useEffect, useState } from "react"
import Pokemon from "../[pokemon]/page";
type Pokemon = {
    name: string;
    url: string;
  };
export default function PokeCard(props :Pokemon) {

    const { name , url } = props;

    const [sprite, setSprite] = useState('' as string);
    const [loading, setLoading] = useState(true);
    const [types, setTypes] = useState([] as string[]);
    const [number, setNumber] = useState(0 as number);

    const colorTypes = {
        "normal": 'bg-gray-400',
        "fire": 'bg-red-400',
        "water": 'bg-blue-400',
        "grass": 'bg-green-400',
        "flying": 'bg-yellow-400',
        "fighting": 'bg-orange-400',
        "poison": 'bg-purple-400',
        "electric": 'bg-yellow-400',
        "ground": 'bg-brown-400',
        "rock": 'bg-gray-400',
        "psychic": 'bg-pink-400',
        "ice": 'bg-blue-400',
        "bug": 'bg-green-400',
        "ghost": 'bg-purple-400',
        "steel": 'bg-gray-400',
        "dragon": 'bg-red-400',
        "dark": 'bg-gray-400',
        "fairy": 'bg-pink-400',
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(url);
            const data = await response.json();
            setNumber(data.id);
            const formUrl = data.forms[0].url;
            // get the api url to obtain the sprite
            const response2 = await fetch(formUrl);
            const data2 = await response2.json();
            setSprite(data2.sprites.front_default);
            setTypes(data2.types.map((type: { type: { name: string; }; }) => type.type.name));
            setLoading(false);
            // console.log(data);

            
        };

        fetchData();
    }, [url]);

    return (
        loading? <div className=" bg-slate-400 w-3 animate-spin"></div> :
        <div className="border-white border-4 bg-slate-500 rounded-md min-h-80 min-w-60 flex flex-col items-center">
            
            <div className="flex items-center p-4 ">
            <img
                alt={name}
                className="aspect-square object-cover rounded-lg border bg-slate-400"
                height={150}
                src={sprite}
                width={150}
            />
            </div>
            <div className="flex items-start p-4">
                <div className="flex flex-col">
                    <h2 className="text-lg font-bold leading-none">{name}</h2>
                    <h3 className=" text-gray-200"># {number}</h3>
                    {types.map((t) => (
                        <p key={`name-${t}`} className={`text-sm font-semibold p-1 my-1 rounded leading-none ${colorTypes[t as keyof typeof colorTypes]}`}>{t}</p>
                    ))}
                    
                </div>
            </div>
        </div>
    )
}

