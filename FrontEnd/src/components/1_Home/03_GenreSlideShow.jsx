import React, { useState } from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

function GenreSlideShow({ Rfilms,title }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const filmsPerPage = 2; 

  // Handle previous click
  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Handle next click
  const handleNextClick = () => {
    if (currentIndex < Rfilms.length - filmsPerPage) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="mt-6 h-auto w-full flex flex-col justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl mb-4">{title}</h1>
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="flex gap-2">
            <FaArrowAltCircleLeft
              onClick={handlePrevClick}
              className="h-[40px] w-[40px] cursor-pointer hover:text-gray-600"
            />
            <FaArrowAltCircleRight
              onClick={handleNextClick}
              className="h-[40px] w-[40px] cursor-pointer hover:text-gray-600"
            />
          </div>
          <button>View All &rarr;</button>
        </div>
        <div className="mt-[40px] flex overflow-x-auto gap-x-4 w-full px-7">
          {Rfilms.slice(currentIndex, currentIndex + filmsPerPage).map((item, index) => (
            <div key={index} className="flex-shrink-0 w-6/12 md:w-4/12 lg:w-3/12">
              <img
                src={item.posterImage}
                alt={`Poster of ${item.title}`}
                className="w-full h-auto object-cover rounded"
              />
              <p className="text-center">{item.title}</p>
              <p className="text-center">{item.releaseYear}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GenreSlideShow;