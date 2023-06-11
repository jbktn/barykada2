import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userData from "./login.json";
import logo from "./images/logo.svg";

const findUserNameById = (id) => {
  const user = userData.users.find((user) => user.id === id);
  return user ? user.name : "";
};

const Home = () => {
  const id = document.cookie
    .split("; ")
    .find((row) => row.startsWith("userID="))
    ?.split("=")[1];

  const navigate = useNavigate();
  const userName = findUserNameById(id);

  React.useEffect(() => {
    if (id === undefined) {
      navigate("/login");
      return;
    }
  }, [id, navigate]);

  return (
    <div>
      <header>   
        <Link to={`/`}>
            <img className="logo" src={logo} alt="Logo"/>
        </Link>
            <nav>
                <ul className="nav__links">
                    <li><Link to={`/sprawnosci`}> Sprawności</Link></li>
                    <li><Link to={`/stopien`}>Stopień</Link></li>
                    <li><Link to={`/login`}>Wyloguj</Link></li>
                </ul>
            </nav>
            <div className="second-button">
              <Link to={`/`}>Twój profil</Link> 
            </div>                      
        </header>
      <div className="flex margin-top">
        <div>
          <h2 className="margin-top">
            Witaj {userName}!
          </h2>
          <div className="flex margin-top">
            <div className="">

            </div>            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
