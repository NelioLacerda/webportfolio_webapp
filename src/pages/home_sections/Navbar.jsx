import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion } from "motion/react";
import {useNavigate} from "react-router-dom";

function Navigation({ onNavigate }) {
    const navigate = useNavigate();

    return (
        <ul className="nav-ul">
            <li className="nav-li">
                <button type="button" className="nav-link cursor-pointer" onClick={() => navigate("/home")}>
                    Home
                </button>
            </li>
            <li className="nav-li">
                <button type="button" className="nav-link cursor-pointer" onClick={() => onNavigate("about")}>
                    About
                </button>
            </li>
            <li className="nav-li">
                <button type="button" className="nav-link cursor-pointer" onClick={() => onNavigate("experiences")}>
                    Carrier
                </button>
            </li>
            <li className="nav-li">
                <button type="button" className="nav-link cursor-pointer" onClick={() => onNavigate("contact")}>
                    Contact
                </button>
            </li>
            <li className="nav-li">
                <button type="button" className="nav-link cursor-pointer" onClick={() =>navigate("/projects")}>
                    Projects
                </button>
            </li>
            <li className="nav-li">
                <button type="button" className="nav-link cursor-pointer" onClick={() =>navigate("/blog")}>
                    Blog
                </button>
            </li>
        </ul>
    );
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleNavigate = (id) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
        setIsOpen(false);
    };

    return (
        <div className="fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40">
            <div className="mx-auto c-space max-w-7xl">
                <div className="flex items-center justify-between py-2 sm:py-0">
                    <a
                        href="/public"
                        className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
                    >
                        UserName
                    </a>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
                    >
                        {isOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                    <nav className="hidden sm:flex">
                        <Navigation onNavigate={handleNavigate} />
                    </nav>
                </div>
            </div>
            {isOpen && (
                <motion.div
                    className="block overflow-hidden text-center sm:hidden"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    style={{ maxHeight: "100vh" }}
                    transition={{ duration: 1 }}
                >
                    <nav className="pb-5">
                        <Navigation onNavigate={handleNavigate} />
                    </nav>
                </motion.div>
            )}
        </div>
    );
};

export default Navbar;