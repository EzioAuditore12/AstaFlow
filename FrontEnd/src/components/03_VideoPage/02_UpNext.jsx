import React from 'react'

function UpNext() {
    const upNextVideos = [
        {
            id: 1,
            title: "Steyn Betters Kapil, Arsenal Lose",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 2,
            title: "Champions League Highlights 2024",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 3,
            title: "Premier League Top Goals",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 4,
            title: "NBA Finals Best Moments",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 5,
            title: "UFC 300 Main Event",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 6,
            title: "UFC 300 Main Event",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 7,
            title: "UFC 300 Main Event",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        },
        {
            id: 8,
            title: "UFC 300 Main Event",
            thumbnail: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-8qWC_-4zqWI-339x192.jpg"
        }
    ];

    return (
        <div className='w-full col-span-7 lg:col-span-2 p-2 md:px-12 lg:px-2 xl:pr-4'>
            <h1>Up Next</h1>
            <div className='w-full grid grid-cols-5 p-2 gap-x-2 gap-y-2 overflow-y-scroll max-h-[300px] lg:max-h-[600px]'>
                {upNextVideos.map((video) => (
                    <React.Fragment key={video.id}>
                        <img 
                            src={video.thumbnail}
                            className='object-fill col-span-2'
                            alt={video.title}
                        />
                        <h2 className='col-span-3'>{video.title}</h2>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

export default UpNext