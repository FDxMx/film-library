import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/navBar/NavBar';
import TopRated from './components/topRated/TopRated';
import Details from './components/details/Details';
import Favorites from './components/favorites/Favorites';

const App = () => {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<TopRated />} />
        <Route path="/details" element={<Details />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
