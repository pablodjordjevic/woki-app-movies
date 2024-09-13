import React from "react";
import SearchBar from "./components/SearchBar";
import ContainerCard from "./components/ContainerCard";

interface SearchParams {
  query?: string;
  page?: string;
}

interface HomeProps {
  searchParams?: SearchParams;
}

const Home: React.FC<HomeProps> = ({ searchParams }) => {
  const query = searchParams?.query || "";

  return (
    <>
      <SearchBar placeholder={"Movie name"} />
      <ContainerCard query={query} />
    </>
  );
};

export default Home;
