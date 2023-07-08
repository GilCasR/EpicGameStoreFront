import axios from "axios";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/landingPage/LandingPage.jsx";
import Home from "./components/Home/Home.jsx";
import CreateVideogame from "./components/createVideogame/CreateVideogame.jsx";
import Detail from "./components/detail/Detail.jsx";
import About from "./components/about/About.jsx";
import "./App.css";
import User from "./components/User/User.jsx";
import Cart from "./components/Cart/Cart.jsx";
axios.defaults.baseURL = `http://localhost:3001/`;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home/:id" component={Detail} />
          <Route path="/home" component={Home} />
          <Route path="/videogame" component={CreateVideogame} />
          <Route path="/about" component={About} />
          <Route path="/user" component={User} />
          <Route path="/cart" component={Cart} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
