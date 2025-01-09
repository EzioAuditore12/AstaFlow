import React from 'react'

function TopMovie({Films}) {
  return (
    <>
    {Films.map((item, index) => (
        <div
          key={item.id}
          className="h-[500px] w-full text-white bg-center bg-cover"
          style={
            index === 0
              ? { backgroundImage: `url('${item.movieImageURL}')` }
              : {}
          }
        >
        <div className='h-full w-full flex flex-col justify-center items-center p-2 '>
          {index === 0 && 
  
      (
          <>
             <h1 className="text-3xl font-bold">{item.title}</h1>
             <div className='flex gap-2 font-semibold'>
              <h2>{item.year}</h2>
              <h2>|</h2>
              <h2>{item.genre}</h2>
              <h2>|</h2>
              <h2>{item.time}</h2>
              </div>
              <div className='mt-7 flex flex-col gap-y-5 w-full justify-center items-center md:flex-row md:gap-x-2'>
              <button className='w-full bg-blue-500 min-h-[40px] rounded-md font-bold md:w-[200px] md:p-5'>WATCH NOW</button>
              <button className='w-full bg-transparent border-2  min-h-[40px] rounded-md font-bold md:w-[200px] md:p-5'>+ PLAYLIST</button>
              </div>
          </>
      )
          }
        </div>
        </div>
      ))}
      </>
  )
}

export default TopMovie