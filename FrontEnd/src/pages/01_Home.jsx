import React from 'react'
import FirstBanner from '../components/1_Home/01_FirstBanner';
import PopularMovies from '../components/1_Home/02_PopularMovies';

const Films = [
    {
      id: "1",
      title: "The Shawshank Redemption",
      year: "1994",
      genre: "Drama",
      time: "1h 22 min",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
      moviePosterURL: "https://scrapsfromtheloft.com/wp-content/uploads/2017/11/The-Godfather-Marlon-Brando.jpg"
    },
    {
      id: "2",
      title: "The Godfather",
      year: "1972",
      genre: "Crime/Drama",
      time: "2 h 55 min",
      moviePosterURL: "https://i.ytimg.com/vi/eZHsmb4ezEk/maxresdefault.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "3",
      title: "Pulp Fiction",
      year: "1994",
      genre: "Crime/Drama",
      time: "2 h 34 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "4",
      title: "The Dark Knight",
      year: "2008",
      genre: "Action/Drama",
      time: "2 h 32 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "5",
      title: "Inception",
      year: "2010",
      genre: "Sci-Fi/Action",
      time: "2 h 28 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "6",
      title: "Forrest Gump",
      year: "1994",
      genre: "Drama/Romance",
      time: "2 h 22 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "7",
      title: "The Matrix",
      year: "1999",
      genre: "Sci-Fi/Action",
      time: "2 h 16 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "8",
      title: "Goodfellas",
      year: "1990",
      genre: "Crime/Drama",
      time: "2 h 25 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BY2NkZjEzMDgtN2RjYy00YzM1LWI4ZmQtMjIwYjFjNmI3ZGEwXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
    {
      id: "9",
      title: "Fight Club",
      year: "1999",
      genre: "Drama/Thriller",
      time: "2 h 19 min",
      moviePosterURL: "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_.jpg",
      movieImageURL: "https://i.guim.co.uk/img/media/7cc099cd0814b39f262c4f1f64e202b0045e26d0/0_0_3504_2103/master/3504.jpg?width=620&dpr=2&s=none&crop=none",
    },
  ];

  const PopularMoviesList=[
    {
      id: 1,
      title: "The Shawshank Redemption",
      releaseYear: 1994,
      genre: "Drama",
      posterImage: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg",
    },
    {
      id: 2,
      title: "The Godfather",
      releaseYear: 1972,
      genre: "Crime",
      posterImage: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    },
    {
      id: 3,
      title: "The Dark Knight",
      releaseYear: 2008,
      genre: "Action",
      posterImage: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    },
    {
      id: 4,
      title: "Pulp Fiction",
      releaseYear: 1994,
      genre: "Crime",
      posterImage: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg",
    },
    {
      id: 5,
      title: "Forrest Gump",
      releaseYear: 1994,
      genre: "Drama",
      posterImage: "https://image.tmdb.org/t/p/w500/h5J4W4veyxMXDMjeNxZI46TsHOb.jpg",
    },
    {
      id: 6,
      title: "Inception",
      releaseYear: 2010,
      genre: "Sci-Fi",
      posterImage: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    },
    {
      id: 7,
      title: "Fight Club",
      releaseYear: 1999,
      genre: "Drama",
      posterImage: "https://image.tmdb.org/t/p/w500/a26cQPRhJPX6GbWfQbvZdrrp9j9.jpg",
    },
    {
      id: 8,
      title: "The Matrix",
      releaseYear: 1999,
      genre: "Sci-Fi",
      posterImage: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg",
    },
    {
      id: 9,
      title: "Goodfellas",
      releaseYear: 1990,
      genre: "Crime",
      posterImage: "https://image.tmdb.org/t/p/w500/aKuFiU82s5ISJpGZp7YkIr3kCUd.jpg",
    },
    {
      id: 10,
      title: "The Lord of the Rings: The Fellowship of the Ring",
      releaseYear: 2001,
      genre: "Fantasy",
      posterImage: "https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg",
    },
    {
      id: 11,
      title: "Star Wars: Episode V - The Empire Strikes Back",
      releaseYear: 1980,
      genre: "Sci-Fi",
      posterImage: "https://image.tmdb.org/t/p/w500/2l05cFWJacyIsTpsqSgH0wQXe4V.jpg",
    },
    {
      id: 12,
      title: "The Social Network",
      releaseYear: 2010,
      genre: "Drama",
      posterImage: "https://image.tmdb.org/t/p/w500/n0ybibhJtQ5icDqTp8eRytcIHJx.jpg",
    },
    
  ]
  

function Home() {
    return (
      <>
        <FirstBanner Films={Films}/>
        <PopularMovies PopularMoviesList={PopularMoviesList}/>
      </>
    );
  }
  
  export default Home;