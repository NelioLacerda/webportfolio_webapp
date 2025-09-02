import './App.css'
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Blog from "./pages/Blog.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";

function App() {

  return (
    <>
        <Toaster />
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/projects/:id" element={<ProjectInfo />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App