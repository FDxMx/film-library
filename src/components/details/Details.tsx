import { useState, useEffect } from "react";
import './Details.css';
import axios from "axios"
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Details = () => {

    const navigate = useNavigate();  
    const imageBasePath = 'https://image.tmdb.org/t/p/w500';
    var detailsUrl: string = 'https://api.themoviedb.org/3/movie/movieId?api_key=a74169393e0da3cfbc2c58c5feec63d7'; 

    const [details, setDetails] = useState({id: '', title: '', poster_path: '', vote_average: '', release_date: '', overview: ''});  

    useEffect(() => {
        const results = async () => {
            try {
              const id:string = JSON.parse(localStorage.getItem('id') ?? "false");
              const url = detailsUrl.replace('movieId', id);
              await axios.get(url).then(res => setDetails(res.data));
            } catch (err) {
              console.log("Errore nel reperimento dei dati: " + err);
            }
          };
          results();
    }, []);

    function addToFavorite(id: string){
        const favorites: string[] = JSON.parse(localStorage.getItem('favorites') ?? "false");
        favorites.push(id);
        localStorage.setItem('favorites', JSON.stringify(favorites));
        refreshPage();
    };

    function removeFromFavorite(id: string){
      const favorites: string[] = JSON.parse(localStorage.getItem('favorites') ?? "false");
      const result = favorites.filter(rs => rs !== id);
      localStorage.setItem('favorites', JSON.stringify(result));
      refreshPage();
  };

    function checkFavoriteMovie(id: string) {
      const existFavorites: string = JSON.parse(localStorage.getItem('favorites') ?? "false");
      if(String(existFavorites) == "false"){
        const favorites: string[] = [];
        localStorage.setItem('favorites', JSON.stringify(favorites));
      }
      const favorites: string[] = JSON.parse(localStorage.getItem('favorites') ?? "false");
      if(favorites.includes(id)){
        return (
          <div>
                <Button id="button-remove-favorite" onClick={() => removeFromFavorite(details.id)} className="btn">Remove from favorite</Button>
          </div>
        );
      } else {
        return (
          <div>
                <Button id="button-add-favorite" onClick={() => addToFavorite(details.id)} className="btn">Add to favorite</Button>
          </div>
        );
      }
    }

    function goBack(){
      navigate(-1);
    }

    function refreshPage(){
      window.location.reload();
    }

    return (

    <div className="container">
        <div className="row">
            <div className="col-sm-3">
                <img src={imageBasePath + details.poster_path}/>
                <div>
                <Button id="button-go-back" onClick={goBack} className="btn">Go Back</Button>
              </div>
            </div>
            <div className="col-sm-4">
                  <h1><strong>{details.title}</strong></h1>
              <div className="row">
                  <div className="col-sm-2">
                    <h6>{details.vote_average}</h6>
                  </div>
                  <div className="col-sm-3">
                    <h6>{details.release_date}</h6>
                  </div>
              </div>
              <h6>{details.overview}</h6>
              {checkFavoriteMovie(details.id)}
            </div>
        </div>
    </div>
    );
  
};

export default Details;