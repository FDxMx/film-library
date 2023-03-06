import { useState, useEffect } from "react";
import './Favorites.css';
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const Favorites = () => {

    const navigate = useNavigate();  
    const imageBasePath = 'https://image.tmdb.org/t/p/w500';
    const [favorites, setFavorites] = useState<any[]>([]); 

    useEffect(() => {
        const results = () => {
            try {
                const favoritesId: string[] = JSON.parse(localStorage.getItem('favorites') ?? "false");
                var movies: any[] = [];
                if(favoritesId.length === 0){
                  console.log('NO FAVORITES MOVIES FOUND');
                } else {
                    favoritesId.forEach(movieId => {
                        const url = 'https://api.themoviedb.org/3/movie/movieId?api_key=a74169393e0da3cfbc2c58c5feec63d7'.replace('movieId', movieId);
                        axios.get(url).then(res => movies.push(res.data));
                    });
                    setFavorites(movies);
                };
            } catch (err) {
              console.log("Errore nel reperimento dei dati: " + err);
            }
          };
        results();
    }, []);

    function goToDetails(id: string){
        localStorage.setItem("id", JSON.stringify(id));
        navigate('/details');
    }

    return (

    <div className="container">
        <div className="row">
            {favorites && favorites.map(({poster_path, id, title}) => (
                <div className="col-sm-3">
                    <div onClick={() => goToDetails(id)} className="card border-0">
                        <img src={imageBasePath + poster_path}/>
                        <div className="card-body">
                            <h6>{title}</h6>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
    );

};

export default Favorites;