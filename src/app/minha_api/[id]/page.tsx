"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface CategoryProps {
  id: number;
  name: string;
  description?: string;
}

interface ItemProps {
  id: number;
  name: string;
  description: string;
  category: CategoryProps;
}

const Itemdatail = ({ params }: { params: { id: string } }) => {
  const { id } = params; // pega o id da url
  const router = useRouter();
  const searchParams = useSearchParams()

  const page = searchParams.get('page') || 1

  const [item, setItem] = useState<ItemProps | null>(null);

  useEffect(()=>{
    const fetchItem = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/items/${id}/`)
      if(!res.ok) {
        setItem(null)
      } else {
        const data = await res.json()
        setItem(data)
      }
    }
    fetchItem()
  },[id])

  if (!item) {
    return <div>Item não encontrado</div>
  }

  return (
    <div className="flex flex-col items-center gap-6 m-10">
      <h1>{item.name}</h1>
      <div>
        <p>{item.description}</p>
        <p>Categoria: {item.category.name}</p>
      </div>
      <div>
        <button className="text-white" onClick={() => router.push(`/minha_api?page=${page}`)}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default Itemdatail;
