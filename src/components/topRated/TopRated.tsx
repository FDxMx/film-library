import { useNavigate } from 'react-router-dom';
import './TopRated.css';
import { useState, useEffect } from "react";
import axios from "axios"
import { Button } from 'react-bootstrap';

const TopRated = () => {

 const [topRated, setTopRated] = useState([]);   
 const navigate = useNavigate();
 const imageBasePath = 'https://image.tmdb.org/t/p/w500';
 const apiUrlFirstPage = `https://api.themoviedb.org/3/movie/top_rated?api_key=a74169393e0da3cfbc2c58c5feec63d7&page=1`;
 var apiUrl = '';

 useEffect(() => {
    localStorage.removeItem('id');
    const checkApiUrl:string = JSON.parse(localStorage.getItem('apiUrl') ?? "false");
    if(String(checkApiUrl) == "false"){
        localStorage.setItem('apiUrl', JSON.stringify(apiUrlFirstPage));
        apiUrl = apiUrlFirstPage;
    } else {
        apiUrl = checkApiUrl;
    }
    getData(apiUrl);
  }, []);

  function getData(apiUrlInput: string){
    const results = async () => {
        try {
          await axios.get(apiUrlInput).then(res => setTopRated(res.data.results));
        } catch (err) {
          console.log("Errore nel reperimento dei dati: " + err);
        }
      };
      results();
  }

  function loadMoreData() {
    const checkApiUrl:string = JSON.parse(localStorage.getItem('apiUrl') ?? "false");
    var page: string = checkApiUrl.charAt(checkApiUrl.length - 1);
    var pagePlus1: string = String(parseInt(page) + 1);
    var newApiUrl = checkApiUrl.replace('page='.concat(page), 'page='.concat(pagePlus1));
    localStorage.setItem('apiUrl', JSON.stringify(newApiUrl));
    getData(newApiUrl);
  }

  function goToDetails(id: string){
    localStorage.setItem("id", JSON.stringify(id));
    navigate('/details');
  }

 return (

    <div className="container">
        <div className="row">

        {topRated && topRated.map(({poster_path, id, title}) => (
        <div className="col-sm-3">
            <div onClick={() => goToDetails(id)} className="card border-0" key={id}>
                <img src={imageBasePath + poster_path}/>
                <div className="card-body">
                    <h6>{title}</h6>
                </div>
            </div>
        </div>
       ))}
        </div>
        <div className="text-center">
            <Button onClick={loadMoreData} className="btn btn-light btn-rounded">Load More</Button>
        </div>
    </div>

 );
};

export default TopRated;