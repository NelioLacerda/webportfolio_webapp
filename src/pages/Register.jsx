import { useState } from "react";
import { motion } from "motion/react";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Image as ImageIcon,
    User,
    Github,
    Linkedin,
    Instagram,
    Loader2,
} from "lucide-react";
import FormField from "../components/FormField .jsx";
import PasswordField from "../components/PasswordField .jsx";
import TagInput from "../components/TagInput .jsx";
import {Particles} from "../components/Particles.jsx";

const initialState = {
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    sex: "",
    location: "",
    aboutMe: "",
    profileImageUrl: "",
    dateOfBirth: "",
    githubUrl: "",
    linkedinUrl: "",
    instagramUrl: "",
    majorSkills: [],
    toolChain: [],
};

const Register = () => {
    const [form, setForm] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const setField = (key, value) => {
        setForm((f) => ({ ...f, [key]: value }));
    };

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Nome é obrigatório.";
        if (!form.email.trim()) e.email = "E-mail é obrigatório.";
        else if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "E-mail inválido.";
        if (!form.password || form.password.length < 6)
            e.password = "Senha deve ter ao menos 6 caracteres.";
        if (!form.dateOfBirth) e.dateOfBirth = "Data de nascimento é obrigatória.";
        if (form.phoneNumber && !/^\d{7,15}$/.test(String(form.phoneNumber)))
            e.phoneNumber = "Telefone deve conter apenas dígitos (7 a 15).";
        return e;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const eMap = validate();
        setErrors(eMap);
        if (Object.keys(eMap).length > 0) return;

        setLoading(true);
        try {
            const payload = {
                name: form.name.trim(),
                email: form.email.trim(),
                phoneNumber: form.phoneNumber ? Number(form.phoneNumber) : null,
                password: form.password,
                sex: form.sex || null,
                location: form.location || null,
                aboutMe: form.aboutMe || null,
                profileImageUrl: form.profileImageUrl || null,
                dateOfBirth: form.dateOfBirth, // "YYYY-MM-DD"
                githubUrl: form.githubUrl || null,
                linkedinUrl: form.linkedinUrl || null,
                instagramUrl: form.instagramUrl || null,
                majorSkills: form.majorSkills,
                toolChain: form.toolChain,
            };

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
                className="relative w-full max-w-3xl mx-auto"
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
            >
                <div className="rounded-2xl ring ring-gray-700/60 bg-storm/80 backdrop-blur border border-white/5 shadow-xl p-6 sm:p-8">
                    <header className="mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-light tracking-tight">
                            Create an Account
                        </h1>
                        <p className="text-sm text-neutral-400 mt-1">
                            Fill your data to create a new account.
                        </p>
                    </header>

                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <FormField
                                id="name"
                                label="Name"
                                required
                                placeholder="Your Frist and Last name"
                                icon={User}
                                value={form.name}
                                onChange={(e) => setField("name", e.target.value)}
                                error={errors.name}
                                autoComplete="name"
                            />

                            <FormField
                                id="email"
                                label="E-mail"
                                required
                                placeholder="JohnDoe@email.com"
                                icon={Mail}
                                type="email"
                                value={form.email}
                                onChange={(e) => setField("email", e.target.value)}
                                error={errors.email}
                                autoComplete="email"
                            />

                            <FormField
                                id="phoneNumber"
                                label="Phone Number"
                                placeholder="Ex.: 5511999999999"
                                icon={Phone}
                                type="tel"
                                value={form.phoneNumber}
                                onChange={(e) => setField("phoneNumber", e.target.value.replace(/[^\d]/g, ""))}
                                error={errors.phoneNumber}
                                autoComplete="tel"
                            />

                            <div className="space-y-2">
                                <label htmlFor="sex" className="text-sm font-light">
                                    Sexo
                                </label>
                                <select
                                    id="sex"
                                    value={form.sex}
                                    onChange={(e) => setField("sex", e.target.value)}
                                    className="w-full rounded-lg bg-black/20 text-sm sm:text-base px-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                                >
                                    <option value="">Select</option>
                                    <option value="MALE">Male</option>
                                    <option value="FEMALE">Female</option>
                                </select>
                            </div>

                            <FormField
                                id="location"
                                label="Location"
                                placeholder="City, Country"
                                icon={MapPin}
                                value={form.location}
                                onChange={(e) => setField("location", e.target.value)}
                            />

                            <FormField
                                id="dateOfBirth"
                                label="Date of Birth"
                                required
                                type="date"
                                icon={Calendar}
                                value={form.dateOfBirth}
                                onChange={(e) => setField("dateOfBirth", e.target.value)}
                                error={errors.dateOfBirth}
                                autoComplete="bday"
                            />
                        </div>

                        <PasswordField
                            id="password"
                            label="Password"
                            required
                            value={form.password}
                            onChange={(e) => setField("password", e.target.value)}
                            error={errors.password}
                            autoComplete="new-password"
                        />

                        <div className="space-y-2">
                            <label htmlFor="aboutMe" className="text-sm font-light">
                                About me
                            </label>
                            <textarea
                                id="aboutMe"
                                value={form.aboutMe}
                                onChange={(e) => setField("aboutMe", e.target.value)}
                                placeholder="Tell us a little about yourself..."
                                rows={4}
                                className="w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 px-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <FormField
                                id="profileImageUrl"
                                label="URL da Imagem de Perfil"
                                placeholder="https://..."
                                icon={ImageIcon}
                                value={form.profileImageUrl}
                                onChange={(e) => setField("profileImageUrl", e.target.value)}
                            />

                            <FormField
                                id="githubUrl"
                                label="GitHub"
                                placeholder="https://github.com/seu-usuario"
                                icon={Github}
                                value={form.githubUrl}
                                onChange={(e) => setField("githubUrl", e.target.value)}
                            />

                            <FormField
                                id="linkedinUrl"
                                label="LinkedIn"
                                placeholder="https://linkedin.com/in/seu-usuario"
                                icon={Linkedin}
                                value={form.linkedinUrl}
                                onChange={(e) => setField("linkedinUrl", e.target.value)}
                            />

                            <FormField
                                id="instagramUrl"
                                label="Instagram"
                                placeholder="https://instagram.com/seu-usuario"
                                icon={Instagram}
                                value={form.instagramUrl}
                                onChange={(e) => setField("instagramUrl", e.target.value)}
                            />
                        </div>

                        <TagInput
                            id="majorSkills"
                            label="Principais Skills"
                            placeholder="Digite a skill e pressione Enter ou clique em Adicionar"
                            values={form.majorSkills}
                            onChange={(vals) => setField("majorSkills", vals)}
                        />

                        <TagInput
                            id="toolChain"
                            label="Ferramentas (Toolchain)"
                            placeholder="Digite uma ferramenta e pressione Enter ou clique em Adicionar"
                            values={form.toolChain}
                            onChange={(vals) => setField("toolChain", vals)}
                        />

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
                                    Criando conta...
                                </>
                            ) : (
                                "Registrar"
                            )}
                        </motion.button>

                        <p className="text-center text-sm text-neutral-400">
                            Já tem uma conta?
                            <button
                                type="button"
                                className="ml-1 text-neutral-200 hover:underline"
                                onClick={() => {
                                    // navegue para a página de login
                                }}
                            >
                                Entrar
                            </button>
                        </p>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Register;