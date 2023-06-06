import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userData from "./login.json";
import logo from "./logo.svg";

const Login = () => {
  const navigate = useNavigate(); // Hook useNavigate

  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loginError, setLoginError] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleLogin = () => {
    const { username, password } = loginData;
    const foundUser = userData.users.find(
      (user) => user.id === username && user.password === password
    );

    if (foundUser) {
      setIsLoggedIn(true);
      setUser(foundUser);
      setLoginError(false);
      // Zapisanie ID użytkownika jako cookie
      document.cookie = `userID=${foundUser.id}`;
      navigate("/"); // Przekierowanie na główną stronę po zalogowaniu
    } else {
      setIsLoggedIn(false);
      setUser(null);
      setLoginError(true);
    }
  };

  return (
    <div>
      <img className="flex logo margin-top" src={logo} alt="Logo"/>      
      <div className="flex margin-top">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Login"
            value={loginData.username}
            onChange={handleInputChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Hasło"
            value={loginData.password}
            onChange={handleInputChange}
          />
          <button className="logo" onClick={handleLogin}>Zaloguj</button>

          {loginError && (
            <p>Niepoprawne dane logowania. Spróbuj ponownie.</p>
          )}

          {isLoggedIn && user && <p>Witaj, {user.name}!</p>}
        </div>
      </div>
    </div>
  );
};

export default Login;
