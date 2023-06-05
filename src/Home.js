import { Link } from "react-router-dom";

const Home = () => {
  const id = "antonipuchala";

  return (
    <div>
      <h1 className="py-2 px-2 text-white font-semibold text-2xl text-border-green bot-border">
        40 KDH Barykada
      </h1>
      <div className="h-100vh flex text-white bg-green-900 items-center justify-center">
        <div>
          <h2 className="font-semibold px-3 py-3 text-3xl text-center border-2 border-white rounded">
            Wybierz jedną z opcji:
          </h2>
          <div className="text-black text-3xl flex items-center justify-center">
            <div className="px-4 py-4">
              <Link
                className="main-button"
                to={`/sprawnosci?search=${id}`}
              >
                Sprawności
              </Link>
            </div>
            <div className="px-4 py-4">
              <Link
                className="main-button"
                to={`/stopien?search=${id}`}
              >
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