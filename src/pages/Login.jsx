import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Loader2 } from "lucide-react";
import {Particles} from "../components/Particles.jsx";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await new Promise((r) => setTimeout(r, 900));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="relative min-h-screen w-full flex items-center justify-center">
            <Particles
                className="absolute inset-0 -z-50"
                quantity={100}
                ease={80}
                color={"#ffffff"}
                refresh
            />
            <motion.div
                aria-hidden
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
            />

            <motion.div
                className="relative w-full max-w-md mx-auto"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
                <div className="rounded-2xl ring ring-gray-700/60 bg-storm/80 backdrop-blur border border-white/5 shadow-xl p-6 sm:p-8">
                    <header className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-light tracking-tight">
                            Bem-vindo de volta
                        </h1>
                        <p className="text-sm text-neutral-400 mt-1">
                            Acesse sua conta para continuar
                        </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-light">
                                E-mail
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                    <Mail size={18} />
                                </div>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    autoComplete="email"
                                    className="w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 pl-10 pr-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                                    placeholder="voce@exemplo.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-light">
                                Senha
                            </label>
                            <div className="relative">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    autoComplete="current-password"
                                    className="w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 pl-10 pr-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                                    placeholder="Sua senha"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <button
                                type="button"
                                className="text-sm text-neutral-300 hover:text-white transition"
                                onClick={() => {
                                }}
                            >
                                Esqueci minha senha
                            </button>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            disabled={loading}
                            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-white/90 text-black font-medium py-2.5 transition hover:bg-white disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Entrando...
                                </>
                            ) : (
                                "Entrar"
                            )}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm text-neutral-400">
                        Não tem uma conta?
                        <button
                            type="button"
                            className="ml-1 text-neutral-200 hover:underline"
                            onClick={() => {
                            }}
                        >
                            Criar conta
                        </button>
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Login;