import React from 'react'
import FirstBanner from '../components/1_Home/FirstBanner';

const Films = [
    {
      id: "1",
      title: "The Shawshank Redemption",
      year: "1994",
      genre: "Drama",
      time: "1h 22 min",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "2",
      title: "The Godfather",
      year: "1972",
      genre: "Crime/Drama",
      time: "2 h 55 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      id: "3",
      title: "Pulp Fiction",
      year: "1994",
      genre: "Crime/Drama",
      time: "2 h 34 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      id: "4",
      title: "The Dark Knight",
      year: "2008",
      genre: "Action/Drama",
      time: "2 h 32 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
    },
    {
      id: "5",
      title: "Inception",
      year: "2010",
      genre: "Sci-Fi/Action",
      time: "2 h 28 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
    },
    {
      id: "6",
      title: "Forrest Gump",
      year: "1994",
      genre: "Drama/Romance",
      time: "2 h 22 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
    },
    {
      id: "7",
      title: "The Matrix",
      year: "1999",
      genre: "Sci-Fi/Action",
      time: "2 h 16 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
    },
    {
      id: "8",
      title: "Goodfellas",
      year: "1990",
      genre: "Crime/Drama",
      time: "2 h 25 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
    },
    {
      id: "9",
      title: "Fight Club",
      year: "1999",
      genre: "Drama/Thriller",
      time: "2 h 19 min",
      movieImageURL: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
    },
  ];
  

function Home() {
    return (
      <>
        <FirstBanner Films={Films}/>
      </>
    );
  }
  
  export default Home;