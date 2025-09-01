import Navbar from "./home_sections/Navbar.jsx";
import Character from "./home_sections/Character.jsx";
import About from "./home_sections/About.jsx";
import Projects from "./home_sections/Projects.jsx";
import Experiences from "./home_sections/Experiences.jsx";
import Testimonial from "./home_sections/Testimonial.jsx";
import Contact from "./home_sections/Contact.jsx";
import Footer from "./home_sections/Footer.jsx";

function Home() {
    return (
        <div className="container mx-auto max-w-7xl">
            <Navbar />
            <Character />
            <About />
            <Projects />
            <Experiences />
            <Testimonial />
            <Contact />
            <Footer />
        </div>
    )
}

export default Home;