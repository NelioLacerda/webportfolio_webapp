import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {Download, Check } from "lucide-react";
import cvUrl from "../assets/cv/CV.pdf";

const DownloadCVButton = () => {
    const [downloaded, setDownloaded] = useState(false);

    const download = () => {
        setDownloaded(true);
        const link = document.createElement("a");
        link.href = cvUrl;
        link.download = "CV.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => setDownloaded(false), 1200);
    };


    return (
        <motion.button
            onClick={download}
            whileHover={{ y: -5 }}
            whileTap={{ scale: 1.05 }}
            className="relative px-1 py-4 text-sm text-center rounded-full font-extralight bg-primary w-[12rem] cursor-pointer overflow-hidden"
        >
            <AnimatePresence mode="wait">
                {downloaded ? (
                    <motion.p
                        className="flex items-center justify-center gap-2"
                        key="copied"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.1, ease: "easeInOut" }}
                    >
                        <Check  className="w-5" />
                        CV downloaded
                    </motion.p>
                ) : (
                    <motion.p
                        className="flex items-center justify-center gap-2"
                        key="copy"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.1 }}
                    >
                        <Download  className="w-5" />
                        Download my CV
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.button>
    );
};

export default DownloadCVButton;