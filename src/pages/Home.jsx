import "./Home.css";
import { useState, useEffect } from 'react';

import MovieCard from "../components/MovieCard";

// Pegando os dados do arquivo .env
const moviesUrl = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;


const Home = () => {
    // Criando state que irá armazenar os filmes que virão da API
    const [movies, setMovies] = useState([]);

    // Função que irá resgatar os dados da API 
    const getMovies = async (url) => {
        // Realizando requisição na API com fetch
        const resposta = await fetch(url);
        // Convertendo os dados para json
        const dados = await resposta.json();
        
        // Armazenando os resultados em movies
        setMovies(dados.results);
    }

    // useEffect é responsável por executar a função getMovies()
    // Sempre que a página carregar
    useEffect(() => {
        // Montando a url de consulta na API
        const url = `${moviesUrl}top_rated?${apiKey}`;
        // Chamando a função e passando a url 
        getMovies(url);

    }, [])
    return (
        <div className="container">
            <h2 className="title">
                Melhores filmes: 
            </h2>
            <div className="movies-container">
                {movies.map((movie) => 
                    <MovieCard key={movie.id} movie={movie} />
                )}                
            </div>
        </div>
    );
};

export default Home;

