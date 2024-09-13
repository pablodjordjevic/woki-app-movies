import request from "../utils/request";
import CardMovie from "./CardMovie";

// Lo que hago aca es pasarle por parametro el texto de input de busqueda, verifico si hay algo escrito que me filtre, sino que me devuelva todas las movies de la lista
async function getMovies(query: string): Promise<any> {
    const endpoint = query.trim()  
        ? `search/movie?query=${query}` 
        : 'movie/upcoming';
        
    const res = await request({ url: endpoint, method: 'GET' });
    return res;
}

const ContainerCard = async ({ query }: { query: string }) => {
    const movies = await getMovies(query);
    return (
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-5">
            <div className="grid justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {movies?.results.map((movie: any) => (
                    <CardMovie key={movie.id} props={movie} />
                ))}
            </div>
        </section>
    );
};

export default ContainerCard;
