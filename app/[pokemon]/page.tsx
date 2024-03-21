'use client'

import { useParams } from "next/navigation";
import { useContext, useEffect, useState } from "react"



type pokemon = {
    name: string;
    height: number;
    id: number;
    url: string;
    };

export default function Pokemon() {
    const { pokemon } = useParams() as {pokemon: string};
    const [types, setTypes] = useState([] as string[]);
    const [sprite, setSprite] = useState('' as string);
    const [height, setHeight] = useState(0 as number);
    const [weight, setWeight] = useState(0 as number);
    useEffect (() => {
        const fetchData = async () => {
        console.log(pokemon);
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        setTypes(data.types.map((type: { type: { name: string; }; }) => type.type.name));
        setHeight(data.height);
        setWeight(data.weight);
        const formUrl = data.forms[0].url;
        // get the api url to obtain the sprite
        const response2 = await fetch(formUrl);
        const data2 = await response2.json();
        setSprite(data2.sprites.front_default);


        };
        fetchData();
    }, [pokemon]);
    return (
        <div>
            <h1>{pokemon}</h1>
            <img src={sprite} alt={pokemon}/>
            <ul>
                {types.map((type, index) => (
                    <li key={index}>{type}</li>
                ))}
            </ul>
            <h2>height: {height}m</h2>
            <h2>weight: {weight}</h2>

        </div>
    );
}