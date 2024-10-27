"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

interface Category {
  id: number;
  name: string;
}

interface Item {
  id: number;
  name: string;
  description: string;
  category: Category;
}

const MinhaApi = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [totalPages, setTotalPages] = useState(0); // Para armazenar o total de páginas

  const searchParams = useSearchParams()
  const router = useRouter()

  const page = parseInt(searchParams.get('page')|| '1')

  useEffect(() => {
    const fetchItems = async () => {
      const res = await fetch(`http://127.0.0.1:8000/api/items/?page=${page}`);
      const data = await res.json();
      setItems(data.results || []);
      setTotalPages(data.count ? Math.ceil(data.count / 2) : 0); // Calcule o total de páginas
    };
    fetchItems();
  }, [page]);

  const handlePageChange = (newPage:number) => {
    router.push(`/minha_api?page=${newPage}`)
  }


  return (
    <div className="flex flex-col items-center gap-4 m-10">
      <h1 className="text-5xl">Items</h1>
      <ul>
        {items.map((item) => (
          <Link key={item.id} href={`/minha_api/${item.id}?page=${page}`}>
            <li>
              {item.name} - Categoria: {item.category.name}
            </li>
          </Link>
        ))}
      </ul>
      <div className="flex gap-2 items-center">
        <button
          className={`${page == 1 ? "text-gray-500" : "text-green-500"}`}
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          Anterior
        </button>
        <span className="text-sm">
          Página {page} de {totalPages}
        </span>
        <button
          className={`${
            page == totalPages ? "text-gray-500" : "text-green-500"
          }`}
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
        >
          Próxima
        </button>
      </div>
      <Link href={'/minha_api/novo_item/'}>Criar novo item</Link>
    </div>
  );
};

export default MinhaApi;
