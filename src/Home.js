import React from "react";
import { Link, useNavigate } from "react-router-dom";
import userData from "./login.json";

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

console.log(id);

  React.useEffect(() => {
    if (id === undefined) {
      navigate("/login");
    }
  }, [id, navigate]);

  return (
    <div>
      <h1 className="py-2 px-2 text-white font-semibold text-2xl text-border-green bot-border">
        <Link to={`/`}>40 KDH Barykada</Link>
      </h1>
      <div className="h-100vh flex text-white bg-green-900 items-center justify-center">
        <div>
          <h2 className="font-semibold px-3 py-3 text-3xl text-center border-2 border-white rounded">
            Witaj {userName}! Wybierz jedną z opcji:
          </h2>
          <div className="text-black text-3xl flex items-center justify-center">
            <div className="px-4 py-4">
              <Link className="main-button" to={`/sprawnosci`}>
                Sprawności
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link className="main-button" to={`/stopien`}>
                Stopień
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
