import React from "react";

function PopularMovies({ PopularMoviesList }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 place-items-center place-content-center bg-gray-900 text-white gap-y-5 w-full h-auto">
      <h1 className="mt-[27px] text-2xl col-span-2 md:col-span-3 text-center">
        <span>Popular Movies</span>
        <br />
        <span>to Watch Now</span>
      </h1>
      <span className="text-sm col-span-2 md:col-span-3">Most watched movies by days</span>
      <hr className="col-span-2 md:col-span-3" />
      <button className="col-span-2 md:col-span-3 text-gray-600 mb-[27px]">VIEW ALL &rarr;</button>
      <div className="col-span-2 md:col-span-3 grid grid-rows-6 grid-cols-2 md:grid-rows-4 md:grid-cols-3 h-full w-full gap-4 px-4">
        {PopularMoviesList.map((item, index) => (
          <div key={item.id} className="h-auto w-full">
            <img
              src={item.posterImage}
              alt={item.title}
              className="w-full rounded-md"
            />
            <h2 className="text-sm text-center mt-2">{item.title}</h2>
          </div>
        ))}
      </div>
      <button className="mt-[30px] col-span-2 md:col-span-3 mb-[70px] border-2 p-3 min-w-[180px]">View More</button>
    </div>
  );
}

export default PopularMovies;
