import { motion } from "motion/react";

const FormField = ({
                       id,
                       label,
                       icon: Icon,
                       type = "text",
                       required = false,
                       placeholder,
                       value,
                       onChange,
                       onBlur,
                       error,
                       autoComplete,
                       inputProps = {},
                   }) => {
    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-light">
                {label} {required && <span className="text-red-400">*</span>}
            </label>
            <div className="relative">
                {Icon && (
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-400">
                        <Icon size={18} />
                    </div>
                )}
                <input
                    id={id}
                    name={id}
                    type={type}
                    required={required}
                    autoComplete={autoComplete}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={placeholder}
                    className={`w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 ${Icon ? "pl-10" : "pl-3"} pr-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition`}
                    {...inputProps}
                />
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

export default FormField;