const { PrismaClient } = require('@prisma/client')
const db = new PrismaClient();

async function seed() {
    await Promise.all(
        getMovies().map((movie) => {
            return db.movies.create({ data: movie });
        })
    );
}

seed();

function getMovies() {
    // shout-out to https://icanhazdadjoke.com/

    return [
        {
            imdbID: "tt0076759",
            name: "Star Wars",
            description: "First Star Wars movie",
            year: "1977",
            poster: "https://m.media-amazon.com/images/M/MV5BNzg4MjQxNTQtZmI5My00YjMwLWJlMjUtMmJlY2U2ZWFlNzY1XkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
        },
        {
            imdbID: "tt0080684",
            name: "Star Wars: Episode V - The Empire Strikes Back",
            description: "Second Star Wars movie",
            year: "1980",
            poster: "https://m.media-amazon.com/images/M/MV5BYmU1NDRjNDgtMzhiMi00NjZmLTg5NGItZDNiZjU5NTU4OTE0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
        },
        {
            imdbID: "tt0086190",
            name: "Star Wars: Episode VI - Return of the Jedi",
            description: "Third Star Wars movie",
            year: "1983",
            poster: "https://m.media-amazon.com/images/M/MV5BOWZlMjFiYzgtMTUzNC00Y2IzLTk1NTMtZmNhMTczNTk0ODk1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
        },

    ];
}