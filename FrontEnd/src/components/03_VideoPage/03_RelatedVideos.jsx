import React from 'react'

function RelatedVideos() {
    const relatedVideos = [
        {
            id: 1,
            title: "Steyn Betters Kapil, Arsenal Lose",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 2,
            title: "Champions League Final Highlights",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-xQICzp30sYM-270x153.jpg"
        },
        {
            id: 3,
            title: "Premier League Best Moments",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-K5h2cd4QtKk-640x360.jpg"
        },
        {
            id: 4,
            title: "NBA Finals Game 7 Recap",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 5,
            title: "UFC 300 Main Event Highlights",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-xQICzp30sYM-270x153.jpg"
        },
        {
            id: 6,
            title: "Formula 1 Monaco GP",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-K5h2cd4QtKk-640x360.jpg"
        },
        {
            id: 7,
            title: "Tennis Grand Slam Finals",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 8,
            title: "Cricket World Cup Finale",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-xQICzp30sYM-270x153.jpg"
        },
        {
            id: 9,
            title: "Baseball World Series Game",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-K5h2cd4QtKk-640x360.jpg"
        },
        {
            id: 10,
            title: "Olympic Games Highlights",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 11,
            title: "Rugby World Cup Final",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-xQICzp30sYM-270x153.jpg"
        },
        {
            id: 12,
            title: "Golf Masters Tournament",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-K5h2cd4QtKk-640x360.jpg"
        }
    ];

    return (
        <div className='mt-[30px] w-full col-span-7 bg-white text-black grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 place-content-center place-items-center p-2 gap-4'>
            <h1 className='col-span-2 md:col-span-3 lg:col-span-4 xl:col-span-5 text-2xl font-bold mb-4'>Related Videos</h1>
            {relatedVideos.map((video) => (
                <div key={video.id} className='col-span-1 flex flex-col justify-center items-center gap-2'>
                    <img 
                        src={video.thumbnail}
                        alt={video.title}
                        className='object-cover w-full h-48'  
                    />
                    <h2 className='text-center text-sm'>{video.title}</h2>
                </div>
            ))}
        </div>
    )
}

export default RelatedVideos