import React from "react";

function PopularMovies({ PopularMoviesList }) {
  return (
    <div className="grid grid-cols-2 place-items-center md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 px-4 xl:px-11 gap-y-5 gap-x-3 bg-gray-900 text-white w-full h-auto">
      {/* Title and Details */}
      <div className="mt-[27px] text-2xl flex flex-col gap-y-5 justify-center items-center col-span-2 md:col-span-3 lg:col-span-2 mb-[27px]">
        <h1 className="text-center">
          <span>Popular Movies</span>
          <br />
          <span>to Watch Now</span>
        </h1>
        <span className="text-sm">Most watched movies by days</span>
        <hr />
        <button className="text-gray-600">VIEW ALL &rarr;</button>
      </div>

      {/* Items Grid */}
      {PopularMoviesList.map((item, index) => (
        <div
          key={item.id}
          className={`h-auto w-full lg:mt-[27px] ${
            index < 3
              ? "col-span-1 md:col-span-1 lg:col-span-1" // First 3 items: Individual columns
              : "col-span-1 md:col-span-1 lg:col-span-1" // Remaining items: Full row
              
          }`}
        >
          <img
            src={item.posterImage}
            alt={item.title}
            className="w-full rounded-md"
          />
          <h2 className="text-sm text-center mt-2">{item.title}</h2>
        </div>
      ))}

      {/* View More Button */}
      <button className="mt-[30px] col-span-2 md:col-span-3 lg:col-span-5 xl:col-span-7 mb-[70px] border-2 p-3 min-w-[180px] max-w-[200px]">
        View More
      </button>
    </div>
  );
}

export default PopularMovies;
