"use client";

import Image from "next/image";
import { useState } from "react";

interface WeatherProps {
  name: string;
  main: {
    feels_like: number;
    humidity: number;
    temp: number;
  };
  weather: {
    description: string;
    icon: string;
    id: number;
  }[];
  wind: {
    speed: number;
  };
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [error, setError] = useState(false);

  let kmSpeed: number | undefined;

  async function fetchWeather(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt_br&appid=${process.env.NEXT_PUBLIC_OPENWEATHER_API_ID}`;

    if (!city) {
      setWeather(null);
      return;
    }

    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data.cod === "404") {
        setError(true);
        setWeather(null);
      } else {
        setError(false);
        setWeather(data as WeatherProps);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  if (weather?.wind.speed !== undefined) {
    kmSpeed = Math.round(weather?.wind.speed * 3.6);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-4 p-10">
        <input
          className="w-44 text-black px-2"
          onChange={(e) => setCity(e.target.value)}
          placeholder="digite a cidade"
          type="text"
        />
        <button className="bg-red-400 w-40" onClick={() => fetchWeather(city)}>
          pesquisar
        </button>
      </div>
      {error && (
        <div>Cidade não encontrada</div>
      )}
      {weather && !error && (
        <div className="flex flex-col justify-center text-black items-center gap-4 w-96 p-10 rounded-xl bg-white">
          <div className="flex gap-2 w-full justify-center ">
            <p>Local:</p>
            {weather?.name}
          </div>
          <div className="flex gap-2">
            <p>Temperatura:</p>
            {weather?.main.temp !== undefined && (
              <div>{Math.round(weather?.main.temp)}ºC</div>
            )}
          </div>
          <div className="flex gap-2 w-full justify-center">
            <p>Sensação termica:</p>
            {weather?.main.temp !== undefined && (
              <div>{Math.round(weather?.main.feels_like)}ºC</div>
            )}
          </div>
          <div className="flex gap-2 w-full items-center  justify-center">
            <p>Humidade:</p>
            {weather?.main.humidity}%
          </div>
          <div className="flex gap-2 flex-col items-center w-full ">
            <p>Tempo:</p>
            {weather.weather.map((item) => (
              <div className="flex gap-2 items-center flex-col " key={item.id}>
                {item.description}
                <Image
                  alt={item.description}
                  width={60}
                  height={60}
                  src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 w-full justify-center ">
            <p>Velocidade do vento:</p>
            {kmSpeed} Km/h
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
