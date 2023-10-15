import { useEffect, useState } from 'react';
import { Link , useNavigate} from 'react-router-dom';

function Navbar() {
  let navigate = useNavigate();
  const [isLogIn,setIsLogIn] = useState(false);

  let token = localStorage.getItem('accessToken');
  useEffect(()=>{
    if(token){
      setIsLogIn(true);
    }
  },[isLogIn])

  function logout(){
    if(token){
      localStorage.removeItem('accessToken');
      navigate('/login');
    }
  }
 
    return (
      <div className="Nav">
        <nav>
          <div className="nav-wrapper">
            <Link to="/" className="brand-logo" style={{left: "10px"}}>Contact Manager</Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              {
                isLogIn ? 
                <>
                   <li><Link to="/search">Search Contacts</Link></li>
                   <li> <button className="btn waves-effect waves-light left" type="submit" onClick={logout} style={{margin:"15px 10px"}} name="action">
                               Log out
                           </button>
                   </li> 
                </>      : 
                <>
                   <li> <Link to="/signup">Sign Up</Link></li>
                   <li><Link to="/login">Log In </Link></li> 
                </>
              }      
            </ul>
          </div>
        </nav>
      </div>
    );
  }
  
  export default Navbar;