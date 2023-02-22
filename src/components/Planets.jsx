import React, { useState } from "react";
import { useQuery } from "react-query";
import Planet from "./Planet";

const fetchPlanet = async (queryKey, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
};

const Planets = () => {
  const [page, setPage] = useState(4);
  const { data, status } = useQuery(
    ["planet", page],
    ({ queryKey }) => fetchPlanet(queryKey, page),
    {
      keepPreviousData: true,
    }
  );

  return (
    <div>
      <h2>Planets</h2>
      {status === "loading" && <div>Loading data...</div>}

      {status === "error" && <div>Error fetching data</div>}

      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 1))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button onClick={() => setPage()}>Next Page</button>
          <div>
            {data?.results?.map((planet) => (
              <Planet key={planet.name} planet={planet} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Planets;
