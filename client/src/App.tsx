import { Route, BrowserRouter, Link, Routes } from "react-router-dom";
import "./App.css";
import { AuthContextProvider } from "./context/authContext";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Pokemon from "./pages/Pokemon";
import PokemonProfile from "./components/PokemonProfile";
function App() {
  return (
    <>
      <BrowserRouter>
        <AuthContextProvider>
          {/* <Link to="/"> Home Page</Link> */}
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Login />} />
            <Route path="/pokemon" element={<Pokemon />} />
            <Route path="/pokemon/:id" element={<PokemonProfile />} />
          </Routes>
        </AuthContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
