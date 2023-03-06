import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {

 return (

 <div className="container">  
   <nav className="navbar navbar-expand-lg justify-content-between">
     <h1>Fav<strong>Movies</strong></h1>
         <ul className="navbar-nav">
            <li className="nav-item active">
              <NavLink to="/" className='nav-link'>Top Rated</NavLink>
            </li>
            <li className="nav-item active">
              <NavLink to="/favorites" className='nav-link'>Favorites</NavLink>
            </li>
         </ul>
   </nav>
 </div>

 );
};

export default NavBar;