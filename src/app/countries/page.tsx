"use client";
import Image from "next/image";
import { useState } from "react";

interface ContriesProps {
  area: number;
  capital: string[];
  flags: {
    alt: string;
    svg: string;
  };
  independent: boolean;
  maps: {
    googleMaps: string;
  };
  name: {
    common: string;
    official: string;
  };
  population: number;
  region: string;
  subregion: string;
}

const Countries = () => {
  const [countrieName, setCountrieName] = useState("");
  const [countrie, setCountrie] = useState<ContriesProps[] | null>(null);

  async function fetchCities(countrie: string) {
    const pais = "london";
    const url = `https://restcountries.com/v3.1/name/${countrie}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setCountrie(data as ContriesProps[]);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <div className="flex gap-5">
        <input
          onChange={(e) => setCountrieName(e.target.value)}
          type="text"
          placeholder="enter the name of the city"
          className="text-black"
        />
        <button
          onClick={() => fetchCities(countrieName)}
          className="bg-red-400 p-2"
        >
          search
        </button>
      </div>
      <div className="flex">
        {countrie?.map((item, index) => (
          <div className="flex items-center w-full justify-center" key={index}>
            <div className="flex flex-col items-start">
              <p >{item.name.common}</p>
              <Image
              
                alt={item.flags.alt}
                src={item.flags.svg}
                width={120}
                height={120}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countries;
