import React from 'react'
import SearchItemsResult from '../components/02_Search/01_searchItemsResult'

const searchResults=[
  {
    id: 1,
    title: "Anderson Fights His Way to Glory",
    releaseYear: 1994,
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-K5h2cd4QtKk-640x360.jpg",
  },
  {
    id: 2,
    title: "BEST BASKETBALL VINES OF FEBRUARY 2019",
    releaseYear: 1972,
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-xQICzp30sYM-270x153.jpg",
  },
  {
    id: 3,
    title: "Steelers vs. Patriots | AFC Championship Game Highlights",
    releaseYear: 2008,
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-TLFX6zKUcPo-270x153.jpg",
  },
  {
    id: 4,
    title: "Pulp Fiction",
    releaseYear: 1994,
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-KObqqMSRlMU-270x153.jpg",
  },
  {
    id: 5,
    title: "Forrest Gump",
    releaseYear: 1994,
    genre: "Drama",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-ARbzVZDy8qA-270x153.jpg",
  },
  {
    id: 6,
    title: "Inception",
    releaseYear: 2010,
    genre: "Sci-Fi",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-pKAvQepT4UQ-270x153.jpg",
  },
  {
    id: 7,
    title: "Fight Club",
    releaseYear: 1999,
    genre: "Drama",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-TIqn06tIDwc-270x153.jpg",
  },
  {
    id: 8,
    title: "The Matrix",
    releaseYear: 1999,
    genre: "Sci-Fi",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-PsYJxJu3NYk-270x153.jpg",
  },
  {
    id: 9,
    title: "Goodfellas",
    releaseYear: 1990,
    genre: "Crime",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-daA2A08YSJU-270x153.jpg",
  },
  {
    id: 10,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    releaseYear: 2001,
    genre: "Fantasy",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-xzB6KSlD6ec-270x153.jpg",
  },
  {
    id: 11,
    title: "Star Wars: Episode V - The Empire Strikes Back",
    releaseYear: 1980,
    genre: "Sci-Fi",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-zFRPLFzsqOk-270x153.jpg",
  },
  {
    id: 12,
    title: "The Social Network",
    releaseYear: 2010,
    genre: "Drama",
    posterImage: "https://vodi.madrasthemes.com/main/wp-content/uploads/sites/2/2019/04/video-thumbnail-Nb324bwXBK8-270x153.jpg",
  },
]


const SearchCategory='hi'
const PageNo=1
function SearchResult() {
  return (
    <div className='mt-[50px]'>
    <div className=' w-full h-[250px] flex justify-center items-center'>
        <h1 className='text-3xl'>Search Results :{SearchCategory} --{PageNo}</h1>
    </div>
    <SearchItemsResult searchResults={searchResults}/>
    </div>
  )
}

export default SearchResult