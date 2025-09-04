import { useState } from "react";
import { X, Plus } from "lucide-react";

const TagInput = ({ id, label, placeholder, values = [], onChange }) => {
    const [input, setInput] = useState("");

    const addTag = () => {
        const v = input.trim();
        if (!v) return;
        if (!values.includes(v)) {
            onChange([...values, v]);
        }
        setInput("");
    };

    const removeTag = (idx) => {
        const copy = [...values];
        copy.splice(idx, 1);
        onChange(copy);
    };

    const onKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addTag();
        }
    };

    return (
        <div className="space-y-2">
            <label htmlFor={id} className="text-sm font-light">
                {label}
            </label>
            <div className="flex gap-2">
                <input
                    id={id}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={onKeyDown}
                    placeholder={placeholder}
                    className="w-full rounded-lg bg-black/20 text-sm sm:text-base placeholder-neutral-500 px-3 py-2.5 ring-1 ring-gray-700/60 focus:outline-none focus:ring-2 focus:ring-gray-500/70 transition"
                />
                <button
                    type="button"
                    onClick={addTag}
                    className="inline-flex items-center cursor-pointer gap-1 rounded-lg bg-white/90 text-black text-sm px-3 py-2.5 hover:bg-white transition"
                >
                    <Plus size={16} />
                    Add
                </button>
            </div>

            {values.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                    {values.map((tag, idx) => (
                        <span
                            key={`${tag}-${idx}`}
                            className="inline-flex items-center gap-1 rounded-full bg-storm/80 ring ring-gray-700/60 px-3 py-1 text-sm"
                        >
              {tag}
                            <button
                                type="button"
                                className="text-neutral-300 cursor-pointer hover:text-white"
                                onClick={() => removeTag(idx)}
                                aria-label={`Remover ${tag}`}
                            >
                <X size={14} />
              </button>
            </span>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TagInput;