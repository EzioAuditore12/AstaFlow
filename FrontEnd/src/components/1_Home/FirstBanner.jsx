import { useLargeDevice, useMediumDevice, useMobile } from "../../context";
import { useExtraLargeDevice } from "../../context/ExtraLargeDeviceContext";

// RecommendedMovies Component
function RecommendedMovies({ Films }) {
     
  const {isMobile}=useMobile()
  const {isMediumDevice}=useMediumDevice()
  const {isLargeDevice}=useLargeDevice()
  const {isExtraLargeDevice}=useExtraLargeDevice()
 
  const TrimmedFilms = isMobile
  ? Films.slice(0, 2)
  : isMediumDevice
  ? Films.slice(0, 3)
  : isLargeDevice
  ? Films.slice(0, 4)
  : isExtraLargeDevice
  ? Films.slice(0,9)
  : Films;
  



  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-3">
      <h1 className="text-2xl font-semibold">Today's Recommended Movie</h1>
      <div className="grid gap-x-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 px-2 md:px-4 lg:px-12 xl:px-[300px]">
        {TrimmedFilms.map((item, index) => (
          <div key={item.id || index} className="flex flex-col items-center">
            <img src={item.movieImageURL} alt={item.title} className="object-center" />
          </div>
        ))}
      </div>
    </div>
  );
}

// TopMovie Component
function TopMovie({ Films }) {
  const topMovie = Films[0]; // Get the top movie, assuming Films has at least one item

  return (
    <div className="h-full ">
      {topMovie && (
        <div
          className="h-full w-full text-white bg-center bg-cover mb"
          style={{ backgroundImage: `url('${topMovie.movieImageURL}')` }}
        >
          <div className="h-full w-full flex flex-col justify-center items-center p-2 mb-[70px]">
            <h1 className="mt-[70px] text-3xl font-bold">{topMovie.title}</h1>
            <div className="flex gap-2 font-semibold">
              <h2>{topMovie.year}</h2>
              <h2>|</h2>
              <h2>{topMovie.genre}</h2>
              <h2>|</h2>
              <h2>{topMovie.time}</h2>
            </div>
            <div className="mt-7 flex flex-col gap-y-5 w-full justify-center items-center md:flex-row md:gap-x-2">
              <button className="w-full bg-blue-500 min-h-[40px] rounded-md font-bold md:w-[200px] md:p-5">
                WATCH NOW
              </button>
              <button className="w-full bg-transparent border-2 min-h-[40px] rounded-md font-bold md:w-[200px] md:p-5">
                + PLAYLIST
              </button>
            </div>
          </div>
          <RecommendedMovies Films={Films} />
        </div>
      )}
    </div>
  );
}

// FirstBanner Component
function FirstBanner({ Films }) {
  return (
    <div className="mt-[60px] flex flex-col h-full w-full ">
      <TopMovie Films={Films} />
    </div>
  );
}

export default FirstBanner;
