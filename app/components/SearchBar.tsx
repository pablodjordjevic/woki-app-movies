"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname()
  const { replace } = useRouter()

  function handleSearch(term: string) {
    // Creo una instancia de urlsearchparams basada en parametros de busqueda
    const params = new URLSearchParams(searchParams)

    // aca valido si esta vacio, elimino el parametro query 
    if(term){
      params.set("query", term)
    } else {
      params.delete("query")
    }
    // actualizo la url del navegador sin recargarlo
    replace(`${pathname}?${params.toString()}`)
  }
 
  return (
    <div className="flex justify-center align-center">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative my-11">
        <i className="fa-solid  fa-magnifying-glass absolute text-gray-500 top-2.5 left-4 text-xs"></i>
        <input
          className="block w-96 py-2 pl-9 rounded-md border border-gray-200 text-sm outline-2 placeholder:text-gray-500"
          placeholder={placeholder}
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
      </div>

    </div>
  );
}