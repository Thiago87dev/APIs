"use client";
import Image from "next/image";
import { useState } from "react";

interface Movie {
  id: string;
  l: string;
  i: {
    imageUrl: string;
  };
}

export default function Home() {
  const [movieName, setMovieName] = useState("");
  const [movie, setMovie] = useState<Movie[]>([]);

  async function fetchMovies(movieName: string) {
    if (!movieName.trim()) {
      setMovie([]);
      return;
    }

    const url = `https://imdb8.p.rapidapi.com/auto-complete?q=${movieName.trim()}%20`;
    const optins = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPID_API_KEY || "",
        "X-RapidAPI-Host": process.env.NEXT_PUBLIC_RAPID_API_HOST || "",
      },
    };
    try {
      const res = await fetch(url, optins);
      const data = await res.json();
      const onlyMovies = data.d.filter((item: Movie) =>
        item.id.startsWith("tt")
      );
      setMovie(onlyMovies as Movie[]);
      console.log(movie);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <div className="text-black flex gap-2">
        <input type="text" onChange={(e) => setMovieName(e.target.value)} />
        <button
          onClick={() => fetchMovies(movieName)}
          className="bg-white"
          type="submit"
        >
          Pesquisar
        </button>
      </div>
      <div className="flex flex-wrap">
        {movie.map((item) => (
          <div className="flex flex-col items-center w-auto p-5" key={item.id}>
            {item.l}
            {item.i && item.i.imageUrl && (
              <Image
                width={160}
                height={160}
                alt={item.l}
                src={item.i.imageUrl}
              />
            )}
          </div>
        ))}
      </div>
    </main>
  );
}
