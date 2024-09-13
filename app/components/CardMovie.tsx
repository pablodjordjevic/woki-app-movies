import Link from "next/link";
import React from "react";
import Image from "next/image";
import notFoundImage from "../images/notfound.png";

interface CardMovieProps {
  props: {
    id: number;
    title: string;
    poster_path: string;
    release_date: string;
    vote_average: string;
    overview: string;
  };
}

const CardMovie: React.FC<CardMovieProps> = async ({ props }) => {
  const { id, poster_path, title, release_date, vote_average, overview } = props;

  // Basicamente recorto la descripcion y paso la cantidad que me muestra en pantalla por parametro, en este caso el pase 100
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  
  // Creo variables para validar si es null la imagen que me viene desde endpoint
  const basePosterUrl = "http://image.tmdb.org/t/p/w500";
  const fallbackPoster = notFoundImage;
  const posterPath = poster_path ? `${basePosterUrl}${poster_path}` : fallbackPoster;

  // Convierto el vote_average a decimal y luego formateo para mostrar solo un decimal en pantalla
  // Si el numero es entero se redondea, de lo contrario, se muestra con un solo decimal
  const voteAverageNumber = parseFloat(vote_average);
  const formattedVoteAverage = voteAverageNumber % 1 === 0 ? Math.round(voteAverageNumber) : voteAverageNumber.toFixed(1);
  let bgColor = "bg-green-200 text-green-500";
  let iconClass = "fa-thumbs-up"; 

  // aca valido si la calificacion, depende cual sea se muestra un icono de manito arriba, abajo y media. Cambia el color del icono tambien dependiendo la validacion
  if (voteAverageNumber < 4) {
    bgColor = "bg-red-200 text-red-500";
    iconClass = "fa-thumbs-down"; 
  } else if (voteAverageNumber < 6) {
    bgColor = "bg-yellow-200 text-yellow-500";
    iconClass = "fa-hand"; 
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="w-full h-72 relative">
        <Image
          src={posterPath}
          alt={title}
          className="object-cover rounded-t-lg"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <div className="text-gray-700 text-base">
          <p>{truncateText(overview, 100)}</p>
          <p>
            <Link href={`/movies/${id}`} className="text-blue-500">
              <i className="fas fa-plus mr-1 mt-2 text-xs"></i>More details
            </Link>
          </p>
        </div>
      </div>
      <div className="px-6 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          <i className="fa-solid fa-calendar mr-2"></i>
          {release_date}
        </span>
        <span className={`inline-block rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2 ${bgColor}`}>
          <i className={`fa-solid ${iconClass} mr-2`}></i>
          {formattedVoteAverage} / 10
        </span>
      </div>
    </div>
  );
};

export default CardMovie;
