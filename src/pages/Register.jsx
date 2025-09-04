import { useState } from "react";
import { motion } from "motion/react";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    User,
    Loader2,
} from "lucide-react";
import FormField from "../components/FormField .jsx";
import PasswordField from "../components/PasswordField .jsx";
import TagInput from "../components/TagInput .jsx";
import {Particles} from "../components/Particles.jsx";
import {Link} from "react-router-dom";
import ProfilePhotoSelector from "../components/ProfilePhotoSelector.jsx";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [sex, setSex] = useState("");
    const [location, setLocation] = useState("");
    const [aboutMe, setAboutMe] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState(null);
    const [majorSkills, setMajorSkills] = useState([]);
    const [toolChain, setToolChain] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const validate = () => {
        const e = {};
        if (!userName.trim()) e.name = "Please fill your name.";
        if (!email.trim()) e.email = "Please fill your e-mail.";
        else if (!/^\S+@\S+\.\S+$/.test(email)) e.email = "Invalid e-mail.";
        if (!password || password.length < 6)
            e.password = "Password must be at least 6 characters long.";
        if (!dateOfBirth) e.dateOfBirth = "Date of birth is mandatory.";
        if (phoneNumber && !/^\d{7,15}$/.test(String(phoneNumber)))
            e.phoneNumber = "Telephone number must contain only digits (9).";
        return e;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const eMap = validate();
        setError(eMap);
        console.log(eMap);
        if (Object.keys(eMap).length > 0) return;

        setLoading(true);
        try {
            const payload = {
                name: userName,
                email: email.trim(),
                phoneNumber: phoneNumber ? Number(phoneNumber) : null,
                password: password,
                sex: sex || null,
                location: location || null,
                aboutMe: aboutMe || "No about me yet.",
                profileImageUrl: profilePhoto || null,
                dateOfBirth: dateOfBirth, // "YYYY-MM-DD"
                githubUrl: null,
                linkedinUrl: null,
                instagramUrl: null,
                majorSkills: majorSkills,
                toolChain: toolChain,
            };

            /*
            const response = await axiosConfig.post(API_ENDPOINTS.REGISTER,
                {userName, email, password, profileImageUrl})
            if (response.status === 201) {
                toast.success("User registered successfully!");
                navigate("/login");
            } else {
                setError("An error occurred while registering. Please try again.");
            }
            console.log(
                "User registered successfully:",
                response.data
            )        } catch (err) {
            console.error(err);
            */
        } catch (error) {
            console.error("Error registering user:", error);
            setError("An error occurred while registering. Please try again.");
        }finally {
            setLoading(false);
        }
    }

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

                    <div className="flex justify-center mb-6">
                        <ProfilePhotoSelector/>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                            <FormField
                                id="name"
                                label="Name"
                                required
                                placeholder="Your Frist and Last name"
                                icon={User}
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                error={error}
                                autoComplete="name"
                            />

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

                            <FormField
                                id="phoneNumber"
                                label="Phone Number"
                                placeholder="Ex.: 5511999999999"
                                icon={Phone}
                                type="tel"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                error={error}
                                autoComplete="tel"
                            />

                            <div className="space-y-2">
                                <label htmlFor="sex" className="text-sm font-light">
                                    Sex
                                </label>
                                <select
                                    id="sex"
                                    value={sex}
                                    onChange={(e) => setSex(e.target.value)}
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
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />

                            <FormField
                                id="dateOfBirth"
                                label="Date of Birth"
                                required
                                type="date"
                                icon={Calendar}
                                value={dateOfBirth}
                                onChange={(e) => setDateOfBirth(e.target.value)}
                                error={error}
                                autoComplete="bday"
                            />
                        </div>

                        <PasswordField
                            id="password"
                            label="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={error}
                            autoComplete="new-password"
                        />

                        <div className="space-y-2">
                            <label htmlFor="aboutMe" className="text-sm font-light">
                                About me
                            </label>
                            <textarea
                                id="aboutMe"
                                value={aboutMe}
                                onChange={(e) => setAboutMe(e.target.value)}
                                placeholder="Tell us a little about yourself..."
                                rows={4}
                                className="w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 px-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                            />
                        </div>

                        <TagInput
                            id="majorSkills"
                            label="Major Skills"
                            placeholder="Enter the skill and press Enter or click Add"
                            values={majorSkills}
                            onChange={(vals) => setMajorSkills(vals)}
                        />

                        <TagInput
                            id="toolChain"
                            label="Toolchain"
                            placeholder="Type in a tool and press Enter or click Add"
                            values={toolChain}
                            onChange={(vals) => setToolChain(vals)}
                        />

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
                                    Creating account...
                                </>
                            ) : (
                                "Sign Up"
                            )}
                        </motion.button>

                        <p className="text-center text-sm text-neutral-400">
                            Already have an account?
                            <Link
                                to="/login"
                                className="ml-1 text-neutral-200 hover:underline cursor-pointer"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </motion.div>
        </section>
    );
};

export default Register;