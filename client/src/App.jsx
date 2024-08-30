import "./App.css";

/* The following line can be included in your src/index.js or App.js file */

import "bootstrap/dist/css/bootstrap.min.css";

import { Routes, Route, Link } from "react-router-dom";
import Signup from "./Signup";
import Login from "./Login";
import Finanse from "./components/Finanse";

function App() {
  return (
    <div>
      <div>
        <Link to={"/"}></Link>
        <Link to={"/login"}></Link>
        <Link to={"/finanse"}></Link>
      </div>

      <Routes>
        <Route Component={Signup} path="/" />
        <Route Component={Login} path="/login" />
        <Route Component={Finanse} path="/finanse" />
      </Routes>
    </div>
  );
}

export default App;
