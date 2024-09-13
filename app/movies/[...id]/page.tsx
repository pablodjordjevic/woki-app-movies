import request from "@/app/utils/request";
import Link from "next/link";
import React from "react"
import Image from "next/image";

interface MoviePageProps {
    params: {
      id: string;
    };
}

// traigo la movie clickeada
async function getMovieDataByID(id: string): Promise<any> {
  const res = await request({url: `/movie/${id}`, method: "GET"});
  return res
}
  
const Page: React.FC<MoviePageProps> = async ({ params }) => {
  const movieDetail = await getMovieDataByID(params.id)

  // Basicamente recorto la descripcion y paso la cantidad que me muestra en pantalla por parametro, en este caso el pase 100
  
  const voteAverageNumber = parseFloat(movieDetail.vote_average);
  const formattedVoteAverage = voteAverageNumber % 1 === 0 ? Math.round(voteAverageNumber) : voteAverageNumber.toFixed(1);
  let bgColor = "bg-green-200 text-green-500";
  let iconClass = "fa-thumbs-up"; 

  if (voteAverageNumber < 4) {
    bgColor = "bg-red-200 text-red-500";
    iconClass = "fa-thumbs-down"; 
  } else if (voteAverageNumber < 6) {
    bgColor = "bg-yellow-200 text-yellow-500";
    iconClass = "fa-hand"; 
  }
  console.log(movieDetail)
  return (
    <div className="container mx-auto px-4 mt-11">
      <Link href="/" className="text-blue-500 hover:underline mb-4 block">
        Back to Movies
      </Link>
      <div className="flex flex-col md:flex-row bg-white shadow-md rounded-lg md:p-6 ">
        {/* Content left */}
        <div className="flex-none w-full md:w-64 relative mb-4 md:mb-0">
          <Image
            src={`http://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            width={250}
            height={350}
            alt={movieDetail.title}
            className="rounded-lg object-cover w-full md:w-auto"
          />
        </div>

        {/* Content right */}
        <div className="flex-auto p-0 md:p-6">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
            {movieDetail.title}
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-700">{movieDetail.overview}</p>

          <div className="mt-4">
            <p className="text-gray-500 text-sm md:text-base">Genres: {movieDetail.genres.map((genre: any) => genre.name).join(", ")}</p>
            {movieDetail.production_companies && movieDetail.production_companies.length > 0 && (
              <p className="text-gray-500 text-sm md:text-base">
                Company: {movieDetail.production_companies[0]?.name || "N/A"}
              </p>
            )}
            {movieDetail.production_companies && movieDetail.production_companies[3] && (
              <p className="text-gray-500 text-sm md:text-base">
                Director: {movieDetail.production_companies[3]?.name || "N/A"}
              </p>
            )}
            {movieDetail.spoken_languages && movieDetail.spoken_languages.length > 0 && (
              <p className="text-gray-500 text-sm md:text-base">
                Languages: {movieDetail.spoken_languages.map((language: any) => language.english_name).join(", ")}
              </p>
            )}
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              <i className="fa-solid fa-calendar mr-2"></i>
              {movieDetail.release_date}
            </span>

            <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mt-5 ${bgColor}`}>
              <i className={`fa-solid ${iconClass} mr-2`}></i>
              {formattedVoteAverage}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page