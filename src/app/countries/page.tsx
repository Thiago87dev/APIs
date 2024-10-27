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
  const [error, setError] = useState<string | null>(null);

  async function fetchCities(countrie: string) {
    const pais = "Brazil";
    const url = `https://restcountries.com/v3.1/name/${countrie}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (Array.isArray(data)) {
        setCountrie(data as ContriesProps[]);
        setError(null);
      } else {
        setCountrie(null);
        setError("Country not found");
      }
      console.log(data);
    } catch (error) {
      console.error(error);
      setError("An error occurred while fetching data.");
    }
  }

  return (
    <div className="flex justify-center items-center h-screen flex-col gap-5">
      <div className="flex gap-5">
        <input
          onChange={(e) => setCountrieName(e.target.value)}
          type="text"
          placeholder="enter the name of the countrie"
          className="text-black"
        />
        <button
          onClick={() => fetchCities(countrieName)}
          className="bg-red-400 p-2"
        >
          search
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      <div className="flex">
        {countrie && countrie.length > 0
          ? countrie.map((item, index) => (
              <div
                className="flex items-center w-full justify-center"
                key={index}
              >
                <div className="flex flex-col items-start">
                  <p>{item.name.common}</p>
                  <Image
                    alt={item.flags.alt}
                    src={item.flags.svg}
                    width={120}
                    height={120}
                    style={{ width: "120px", height: "auto" }}
                  />
                  <p>{item.capital}</p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Countries;
