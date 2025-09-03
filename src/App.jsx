import './App.css'
import {Toaster} from "react-hot-toast";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Projects from "./pages/Projects.jsx";
import Blog from "./pages/Blog.jsx";
import ProjectInfo from "./components/ProjectInfo.jsx";
import BlogInfo from "./components/BlogInfo.jsx";

function App() {

  return (
    <>
        <Toaster />
        <BrowserRouter>
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/info" element={<ProjectInfo />} />
                <Route path="/bloginfo" element={<BlogInfo />} />
            </Routes>
        </BrowserRouter>
    </>
  )
}

export default App