import "./Home.css";
import { useState, useEffect } from 'react';
import MovieCard from "../components/MovieCard";
import { useSearchParams } from "react-router-dom";

// Pegando os dados do arquivo .env
const searchUrl = import.meta.env.VITE_SEARCH;
const apiKey = import.meta.env.VITE_API_KEY;


const Search = () => {
    // Criando state que irá armazenar os filmes que virão da API
    const [movies, setMovies] = useState([]);

    const [searchParams] = useSearchParams();
    const filme = searchParams.get("filme");



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
        const url = `${searchUrl}?${apiKey}&query=${filme}`;
        // Chamando a função e passando a url 
        getMovies(url);

    }, [])
    return (
        <div className="container">
            <h2 className="title">
                Resultados para: {filme}
            </h2>
            <div className="movies-container">
                {movies.map((movie) => 
                    <MovieCard key={movie.id} movie={movie} />
                )}                
            </div>
        </div>
    );
};

export default Search;