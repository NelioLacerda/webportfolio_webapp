import { useState } from "react";
import { motion } from "motion/react";
import { Mail, Lock, Loader2 } from "lucide-react";
import {Particles} from "../components/Particles.jsx";
import {Link} from "react-router-dom";
import PasswordField from "../components/PasswordField .jsx";
import FormField from "../components/FormField .jsx";

const Login = () => {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const validate = () => {
        const e = {};
        if (!email.trim()) e.email = "Please fill your e-mail.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid e-mail.";
        if (!password || password.length < 6)
            e.password = "Password must be at least 6 characters long.";
        return e;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);

            /*
            const response = await axiosConfig.post(API_ENDPOINTS.LOGIN, {email, password});

            const {token, user} = response.data;
            if (token) {
                console.log("Token:", token);
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
             */
        } catch (error) {
            console.error("Error logging in:", error);
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else setError("An error occurred while logging in. Please try again.");
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
                            Welcome Back!!
                        </h1>
                        <p className="text-sm text-neutral-400 mt-1">
                            Please log in to your account to continue
                        </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-5">
                        <FormField
                            id="email"
                            label="E-mail"
                            required
                            placeholder="JohnDoe@email.com"
                            icon={Mail}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={error}
                            autoComplete="email"
                        />

                        <PasswordField
                            id="password"
                            label="Password"
                            required
                            autoComplete="new-password"
                        />

                        <div className="flex items-center justify-between pt-2">
                            <button
                                type="button"
                                className="text-sm cursor-pointer text-neutral-300 hover:text-white transition"
                                onClick={() => {
                                }}
                            >
                                I forgot my password
                            </button>
                        </div>

                        <motion.button
                            type="submit"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            disabled={loading}
                            className="w-full cursor-pointer inline-flex items-center justify-center gap-2 rounded-lg bg-white/90 text-black font-medium py-2.5 transition hover:bg-white disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <Loader2 className="animate-spin" size={18} />
                                    Logging in...
                                </>
                            ) : (
                                "Login"
                            )}
                        </motion.button>
                    </form>

                    <p className="mt-6 text-center text-sm text-neutral-400">
                        Dont have an account?
                        <Link
                            to="/register"
                            className="ml-1 text-neutral-200 hover:underline"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </motion.div>
        </section>
    );
};

export default Login;