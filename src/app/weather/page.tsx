"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

interface DateTimeProps {
  formattedDate: string;
  formattedTime: string;
}

const Weather = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherProps | null>(null);
  const [error, setError] = useState(false);
  const [dateTime, setDateTime] = useState<DateTimeProps>({
    formattedDate: new Date().toLocaleDateString(),
    formattedTime: new Date().toLocaleTimeString(),
  });

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

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {  day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: 'numeric' };
      
      // Obtendo o dia por extenso e a data formatada
      const formattedDate = now.toLocaleDateString('pt-BR', options);
  
      // Obtendo a hora sem os segundos
      const formattedTime = now.toLocaleTimeString('pt-BR', { hour: 'numeric', minute: 'numeric' });
  
      setDateTime({ formattedDate, formattedTime });
    }, 1000);
  
    return () => clearInterval(interval);
  }, []);

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
      {error && <div>Cidade não encontrada</div>}
      {weather && !error && (
        <div className="flex flex-col justify-center text-black items-center gap-4 w-[35rem] p-5 rounded-xl bg-white">
          <div className="flex gap-2 flex-col items-center w-full ">
            {weather.weather.map((item) => (
              <div className="flex flex-col gap-2  w-full" key={item.id}>
                <div className="flex items-center ">
                  <div className="flex text-6xl relative">
                    {weather?.main.temp !== undefined && (
                      <div>
                        <span>{Math.round(weather?.main.temp)}</span>
                        <span className="text-base absolute top-0 right-[-1]">
                          ºC
                        </span>
                      </div>
                    )}
                  </div>
                  <Image
                    alt={item.description}
                    width={70}
                    height={70}
                    src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                  />
                </div>

                <div className="flex  justify-between ">
                  <div className="flex flex-col justify-center ">
                    <div className="flex gap-1">
                      <p>Sensação: </p>
                      {weather?.main.temp !== undefined && (
                        <div>{Math.round(weather?.main.feels_like)}ºC</div>
                      )}
                    </div>
                    <div className="flex gap-1">
                      <p>Humidade:</p>
                      {weather?.main.humidity}%
                    </div>
                    <div className="flex gap-1 ">
                      <p>Vento:</p>
                      {kmSpeed} Km/h
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="text-2xl font-bold">{weather?.name}</div>
                    {dateTime.formattedDate}
                    
                    <div>{item.description}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
