import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Profile from "./components/Profile/Profile";
import Home from "./components/Home/Home";
import Readblog from "./components/Readblog/Readblog";
import Logout from "./components/Logout/Logout";
import Createblog from "./components/Createblog/Createblog";
import Deleteblog from "./components/Deleteblog/Deleteblog";

function App() {
  return (
    <div className="App">
      <HashRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/myprofile" element={<Profile />} />
          <Route path="/readblog/:id" element={<Readblog />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/createblog" element={<Createblog />} />
          <Route path="/deleteblog/:id" element={<Deleteblog />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
