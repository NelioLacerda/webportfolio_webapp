import { useState } from "react";
import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";

const PasswordField = ({
                           id = "password",
                           label = "Senha",
                           required = true,
                           placeholder = "Sua senha",
                           value,
                           onChange,
                           onBlur,
                           error,
                           autoComplete = "new-password",
                       }) => {
    const [visible, setVisible] = useState(false);

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-light">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                    <Lock size={18} />
                </div>
                <input
                    id={id}
                    name={id}
                    type={visible ? "text" : "password"}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className="w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 pl-10 pr-10 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-200"
                    onClick={() => setVisible((v) => !v)}
                    aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
                >
                    {visible ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
            </div>
            {error && (
                <motion.p
                    className="text-xs text-red-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    {error}
                </motion.p>
            )}
        </div>
    );
};

export default PasswordField;