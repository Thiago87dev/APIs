"use client";
import React, { useEffect, useState } from "react";

const Teste = () => {
  const [re, setRe] = useState('');
  async function testeFetch() {
    const url = "https://fun-facts1.p.rapidapi.com/api/fun-facts";
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "095e1c0a63msh1f8bf79ee0d8da7p1e8928jsn3b30aae77064",
        "x-rapidapi-host": "fun-facts1.p.rapidapi.com",
      },
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();
      setRe(result.message)
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col items-center m-4 gap-4">
      <h1>Teste</h1>
      <button className="border-solid border-2 rounded border-red-500 p-1" onClick={testeFetch}>Ver fun fact</button>
      <h1>{re}</h1>
    </div>
  );
};

export default Teste;
