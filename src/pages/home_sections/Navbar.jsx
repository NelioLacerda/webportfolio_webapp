import { useState } from "react";
import {LogOut, Menu, User, X} from "lucide-react";
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
    const [isProfileOpen, setIsProfileOpen] = useState(false);

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
                    <button
                        className="font-bold transition-colors text-neutral-400 hover:text-white cursor-pointer"
                        onClick={() => setIsProfileOpen(true)}
                    >
                        <User className="h-7 w-7"/>
                    </button>
                    {/* Sidebar */}
                    {isProfileOpen && (
                        <>
                            <motion.div
                                className="fixed inset-0 bg-black/60 backdrop-blur-[2px] z-50"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsProfileOpen(false)}
                            />
                            <motion.aside
                                className="fixed right-0 top-0 h-screen w-[22rem] max-w-[92vw] bg-gradient-to-b from-storm to-indigo text-white shadow-2xl z-50 flex flex-col border-l border-white/10"
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                                role="dialog"
                                aria-modal="true"
                                aria-label="Configurações de perfil"
                            >
                                <div className="flex items-start justify-between px-5 py-4 border-b border-white/10">
                                    <div>
                                        <p className="text-xs text-neutral-400">Logado como</p>
                                        <p className="text-base font-semibold leading-tight">UserName</p>
                                        <p className="text-xs text-neutral-400">email</p>
                                    </div>
                                    <button
                                        className="p-2 rounded-md hover:bg-white/5 transition-colors"
                                        onClick={() => setIsProfileOpen(false)}
                                        aria-label="Fechar"
                                    >
                                        <X className="w-5 h-5 text-neutral-300" />
                                    </button>
                                </div>

                                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
                                    <div>
                                        <h3 className="text-sm font-medium text-neutral-300 mb-3">Configurações</h3>
                                        <div className="space-y-2">
                                            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-neutral-200">
                                                Editar perfil
                                            </button>
                                            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-neutral-200">
                                                Preferências
                                            </button>
                                            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-neutral-200">
                                                Segurança
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-white/10 pt-4">
                                        <h3 className="text-sm font-medium text-neutral-300 mb-3">Aparência</h3>
                                        <div className="space-y-2">
                                            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-neutral-200">
                                                Tema
                                            </button>
                                            <button className="w-full text-left px-3 py-2 rounded-md hover:bg-white/5 transition-colors text-sm text-neutral-200">
                                                Acessibilidade
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="px-5 py-4 border-t border-white/10">
                                    <button
                                        className="flex items-center gap-2 w-full justify-center px-4 py-2 text-sm text-white bg-coral hover:brightness-110 rounded-md transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span>Sair</span>
                                    </button>
                                </div>
                            </motion.aside>
                        </>
                    )}
                    {/* end sidebar */}

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