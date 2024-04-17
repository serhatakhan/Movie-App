import axios from "axios";
import { API_KEY } from "../src/constants";

// endpoints
const apiBaseUrl = "https://api.themoviedb.org/3"
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?api_key=${API_KEY}`
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?api_key=${API_KEY}`
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?api_key=${API_KEY}`
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie?api_key=${API_KEY}`;

// dynamic endpoints
const movieDetailsEndpoint = id => `${apiBaseUrl}/movie/${id}?api_key=${API_KEY}`;
const movieCreditsEndpoint = id => `${apiBaseUrl}/movie/${id}/credits?api_key=${API_KEY}`;
const similarMoviesEndpoint = id => `${apiBaseUrl}/movie/${id}/similar?api_key=${API_KEY}`;

// person detail endpoint
const personDetailEndpoint = id => `${apiBaseUrl}/person/${id}?api_key=${API_KEY}`;
const personMoviesEndpoint = id => `${apiBaseUrl}/person/${id}/movie_credits?api_key=${API_KEY}`;

// image poster func.
export const image500 = (path) => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = (path) => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = (path) => path ? `https://image.tmdb.org/t/p/w185${path}` : null


const apiCall = async (endpoint, params) => {
    const options = {
        method: "GET",
        url: endpoint,
        params: params? params: {} // params yoksa boş obje ata
    }

    try {
        const res = await axios.request(options)
        return res.data
    } catch (error) {
        console.log("error", error)
    }
}
export const fetchTrendingMovies = () => {
    return apiCall(trendingMoviesEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingMoviesEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedMoviesEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}

export const fetchPersonDetails = id => {
    return apiCall(personDetailEndpoint(id))
}
export const fetchPersonMovies = id => {
    return apiCall(personMoviesEndpoint(id))
}

export const searchMovies = params => {
    return apiCall(searchMoviesEndpoint, params)
}